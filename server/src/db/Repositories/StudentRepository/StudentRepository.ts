import { QueryResult } from "pg";
import { Status } from "../../../Types/ResultType.js";
import pool from "../../DBInit.js";
import { QueryResultType } from "../../QueryResultType.js";
import {
    addRegTokenQuery,
    addStudentQuery,
    deleteStudentQuery,
    getAllMarksQuery,
    getAllStudentsQuery,
    getMarksWithDatesQuery,
    getMatesQuery,
    getOwnCourses,
    updateStudentQuery,
} from "./StudentQueries.js";

export interface StudentCourse {
    id: string;
    name: string;
    teacherName: string;
    teacherSurname: string;
    isEnrolled: boolean;
}

export interface StudentMarks {
    disciplineId: string;
    disciplineName: string;
    marks: string;
    averageMark: string;
    teacherName: string;
    teacherSurname: string;
}

export interface MarksWithDates {
    mark: number;
    date: string;
    teacherName: string;
    teacherSurname: string;
}

export interface Mate {
    name: string;
    surname: string;
    birthdayDate: string;
}

export interface StudentFP {
    id: string;
    name: string;
    surname: string;
    birthdayDate: Date;
    grade: {
        id: string;
        number: number;
        letter: string;
    };
    averageMark: number;
}

export class StudentRepository {
    static async deleteStudent(
        id: string
    ) {
        let result: QueryResultType<string> = {
            status: Status.FAILURE,
            message: "StudentRepository: Can't add student",
            data: "",
        };

        try {
            const deleteStudentQueryResult: QueryResult<any> = await pool.query(
                deleteStudentQuery(id)
            );

            result = {
                status: Status.SUCCESS,
                message: "StudentRepository: Deleted student",
                data: "",
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async updateStudent(
        id: string,
        name: string,
        surname: string,
        birthday: string,
        gradeId: string
    ) {
        let result: QueryResultType<string> = {
            status: Status.FAILURE,
            message: "StudentRepository: Can't add student",
            data: "",
        };

        try {
            const updateStudentQueryResult: QueryResult<any> = await pool.query(
                updateStudentQuery(id, name, surname, birthday, gradeId)
            );

            result = {
                status: Status.SUCCESS,
                message: "StudentRepository: Updated student",
                data: "",
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async addStudent(
        name: string,
        surname: string,
        birthday: string,
        gradeId: string
    ) {
        let result: QueryResultType<string> = {
            status: Status.FAILURE,
            message: "StudentRepository: Can't add student",
            data: "",
        };

        try {
            const addStudentQueryResult: QueryResult<any> = await pool.query(
                addStudentQuery(name, surname, birthday, gradeId)
            );

            if (addStudentQueryResult.rowCount > 0) {
                const studentId = addStudentQueryResult.rows[0].id;

                const addRegTokenQueryResult: QueryResult<any> =
                    await pool.query(addRegTokenQuery(studentId));

                if (addRegTokenQueryResult.rowCount > 0) {
                    const token = addRegTokenQueryResult.rows[0].token;

                    result = {
                        status: Status.SUCCESS,
                        message: "StudentRepository: Add students",
                        data: token,
                    };
                }
            }

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async getAllStudents() {
        let result: QueryResultType<StudentFP[]> = {
            status: Status.FAILURE,
            message: "Can't get students",
            data: [],
        };

        try {
            let queryResult: QueryResult<any>;
            queryResult = await pool.query(getAllStudentsQuery());

            const rows = queryResult.rows;
            rows.forEach((item) =>
                result.data.push({
                    id: item.id,
                    name: item.name,
                    surname: item.surname,
                    birthdayDate: item.birthdayDate,
                    grade: {
                        id: item.gradeId,
                        number: item.gradeNumber,
                        letter: item.gradeLetter,
                    },
                    averageMark: item.averageMark,
                })
            );

            result = {
                status: Status.SUCCESS,
                message: "Found students",
                data: result.data,
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async getOwnCourses(studentId: string) {
        let result: QueryResultType<StudentCourse[]> = {
            status: Status.FAILURE,
            message: "Can't get courses",
            data: [],
        };

        try {
            let queryResult: QueryResult<any>;
            queryResult = await pool.query(getOwnCourses(studentId));

            const rows = queryResult.rows;
            rows.forEach((item) =>
                result.data.push({
                    id: item.id,
                    name: item.name,
                    teacherName: item.teacherName,
                    teacherSurname: item.teacherSurname,
                    isEnrolled: true,
                })
            );

            result = {
                status: Status.SUCCESS,
                message: "Found user courses",
                data: result.data,
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async getAllMarks(studentId: string) {
        let result: QueryResultType<StudentMarks[]> = {
            status: Status.FAILURE,
            message: "Can't get marks",
            data: [],
        };

        try {
            let queryResult: QueryResult<any>;
            queryResult = await pool.query(getAllMarksQuery(studentId));

            const rows = queryResult.rows;
            rows.forEach((item) =>
                result.data.push({
                    disciplineId: item.disciplineId,
                    disciplineName: item.disciplineName,
                    marks: item.marks,
                    averageMark: item.averageMark,
                    teacherName: item.teacherName,
                    teacherSurname: item.teacherSurname,
                })
            );

            result = {
                status: Status.SUCCESS,
                message: "Found student marks",
                data: result.data,
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async getMarksWithDate(studentId: string, disciplineId: string) {
        let result: QueryResultType<MarksWithDates[]> = {
            status: Status.FAILURE,
            message: "Can't get marks",
            data: [],
        };

        try {
            let queryResult: QueryResult<any>;
            queryResult = await pool.query(
                getMarksWithDatesQuery(studentId, disciplineId)
            );

            const rows = queryResult.rows;

            rows.forEach((item) => {
                const marks = item.marks.split(", ");
                const dates = item.dates.split(", ");

                marks.forEach((dura: any, index: any) =>
                    result.data.push({
                        mark: dura,
                        date: dates[index],
                        teacherName: item.teacherName,
                        teacherSurname: item.teacherSurname,
                    })
                );
            });

            result = {
                status: Status.SUCCESS,
                message: "Found student marks",
                data: result.data,
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async getMates(studentId: string, gradeId: string) {
        let result: QueryResultType<Mate[]> = {
            status: Status.FAILURE,
            message: "Can't get mates",
            data: [],
        };

        try {
            let queryResult: QueryResult<any>;
            queryResult = await pool.query(getMatesQuery(studentId, gradeId));

            const rows = queryResult.rows;

            rows.forEach((item) => {
                result.data.push({
                    name: item.name,
                    surname: item.surname,
                    birthdayDate: item.birthdayDate,
                });
            });

            result = {
                status: Status.SUCCESS,
                message: "Found student mates",
                data: result.data,
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }
}
