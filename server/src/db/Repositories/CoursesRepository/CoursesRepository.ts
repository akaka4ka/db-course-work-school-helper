import { QueryResult } from "pg";
import { Status } from "../../../Types/ResultType.js";
import pool from "../../DBInit.js";
import { QueryResultType } from "../../QueryResultType.js";
import { getAllCoursesQuery, getAvailableCoursesQuery, joinStudentQuery, kickStudentQuery } from "./CoursesQueries.js";

export interface Course {
    id: string;
    name: string;
    teacherName: string;
    teacherSurname: string;
    courseTeacherId: string;
}

export class CoursesRepository {
    static async getAvailableCourses(studentId: string) {
        let result: QueryResultType<Course[]> = {
            status: Status.FAILURE,
            message: "Can't get courses",
            data: [],
        };

        try {
            let queryResult: QueryResult<any>;
            queryResult = await pool.query(getAvailableCoursesQuery(studentId));

            const rows = queryResult.rows;
            rows.forEach((item) =>
                result.data.push({
                    id: item.id,
                    name: item.name,
                    teacherName: item.teacherName,
                    teacherSurname: item.teacherSurname,
                    courseTeacherId: item.courseTeacherId,
                })
            );

            result = {
                status: Status.SUCCESS,
                message: "Found courses",
                data: result.data,
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async getCourses() {
        let result: QueryResultType<Course[]> = {
            status: Status.FAILURE,
            message: "Can't get courses",
            data: [],
        };

        try {
            let queryResult: QueryResult<any>;
            queryResult = await pool.query(getAllCoursesQuery());

            const rows = queryResult.rows;
            rows.forEach((item) =>
                result.data.push({
                    id: item.id,
                    name: item.name,
                    teacherName: item.teacherName,
                    teacherSurname: item.teacherSurname,
                    courseTeacherId: item.courseTeacherId,
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

    static async kickStudent(studentId: string, courseId: string) {
        let result: QueryResultType<null> = {
            status: Status.FAILURE,
            message: "Can't kick student",
            data: null,
        };

        if (!studentId || !courseId) {
            return result;
        }

        try {
            let queryResult: QueryResult<any>;
            queryResult = await pool.query(
                kickStudentQuery(studentId, courseId)
            );

            result = {
                status: Status.SUCCESS,
                message: "Kicked user from course",
                data: null,
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async joinStudent(studentId: string, courseTeacherId: string) {
        const errorMessage: string = "Can't join student";
        const successMessage: string = "Joined user to course"

        let result: QueryResultType<null> = {
            status: Status.FAILURE,
            message: errorMessage,
            data: null,
        };

        if (!studentId || !courseTeacherId) {
            return result;
        }

        try {
            let queryResult: QueryResult<any>;
            queryResult = await pool.query(
                joinStudentQuery(studentId, courseTeacherId)
            );

            result = {
                status: Status.SUCCESS,
                message: successMessage,
                data: null,
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }
}
