import {
    MarksWithDates,
    Mate,
    StudentFP,
    StudentMarks,
    StudentRepository,
} from "./../db/Repositories/StudentRepository/StudentRepository.js";
import { QueryResultType } from "../db/QueryResultType.js";
import { StudentCourse } from "../db/Repositories/StudentRepository/StudentRepository.js";
import { ResultType, Status } from "../Types/ResultType.js";

export class StudentService {
    static async deleteStudent(id: string) {
        let result: ResultType<string>;

        result = {
            status: Status.FAILURE,
            message: "Can't delete student",
            data: null,
        };

        if (!id) {
            return result;
        }

        try {
            const deleteStudentResult = await StudentRepository.deleteStudent(
                id
            );

            if (deleteStudentResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: deleteStudentResult.message,
                    data: deleteStudentResult.data,
                };

                return result;
            }
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
        let result: ResultType<string>;

        result = {
            status: Status.FAILURE,
            message: "Can't update student",
            data: null,
        };

        if (!id || !name || !surname || !birthday || !gradeId) {
            return result;
        }

        try {
            const updateStudentResult = await StudentRepository.updateStudent(
                id,
                name,
                surname,
                birthday,
                gradeId
            );

            if (updateStudentResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: updateStudentResult.message,
                    data: updateStudentResult.data,
                };

                return result;
            }
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
        let result: ResultType<string>;

        result = {
            status: Status.FAILURE,
            message: "Can't add student",
            data: null,
        };

        if (!name || !surname || !birthday || !gradeId) {
            return result;
        }

        try {
            const addStudentResult = await StudentRepository.addStudent(
                name,
                surname,
                birthday,
                gradeId
            );

            if (addStudentResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: addStudentResult.message,
                    data: addStudentResult.data,
                };

                return result;
            }
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async getAllStudents() {
        let result: ResultType<StudentFP[]>;

        try {
            const findUserResult = await StudentRepository.getAllStudents();

            if (findUserResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: "Found students",
                    data: findUserResult.data,
                };

                return result;
            }
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: "Can't find students",
                data: null,
            };

            return result;
        }
    }

    static async getOwnCourses(userId: string) {
        if (!userId) {
            return {
                status: Status.FAILURE,
                message: "Caught invalid argument",
                data: null,
            };
        }

        let result: ResultType<StudentCourse[]>;
        let findUserResult: QueryResultType<StudentCourse[]>;

        try {
            const findUserResult = await StudentRepository.getOwnCourses(
                userId
            );

            if (findUserResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: "Found student courses",
                    data: findUserResult.data,
                };

                return result;
            }
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: findUserResult.message,
                data: null,
            };

            return result;
        }
    }

    static async getAllMarks(studentId: string) {
        if (!studentId) {
            return {
                status: Status.FAILURE,
                message: "Caught invalid argument",
                data: null,
            };
        }

        let result: ResultType<StudentMarks[]>;

        try {
            const findMarksResult = await StudentRepository.getAllMarks(
                studentId
            );

            if (findMarksResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: findMarksResult.message,
                    data: findMarksResult.data,
                };

                return result;
            }
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: "Can't get student marks",
                data: null,
            };

            return result;
        }
    }

    static async getMarksWithDate(studentId: string, disciplineId: string) {
        if (!studentId || !disciplineId) {
            return {
                status: Status.FAILURE,
                message: "Caught invalid argument",
                data: null,
            };
        }

        let result: ResultType<MarksWithDates[]>;
        let findMarksResult: QueryResultType<MarksWithDates[]>;

        try {
            const findMarksResult = await StudentRepository.getMarksWithDate(
                studentId,
                disciplineId
            );

            if (findMarksResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: findMarksResult.message,
                    data: findMarksResult.data,
                };

                return result;
            }
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: "Can't get student marks",
                data: null,
            };

            return result;
        }
    }

    static async getMates(studentId: string, gradeId: string) {
        if (!studentId || !gradeId) {
            return {
                status: Status.FAILURE,
                message: "Caught invalid argument",
                data: null,
            };
        }

        let result: ResultType<Mate[]>;

        try {
            const findMatesResult = await StudentRepository.getMates(
                studentId,
                gradeId
            );

            if (findMatesResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: findMatesResult.message,
                    data: findMatesResult.data,
                };

                return result;
            }
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: "Can't get student mates",
                data: null,
            };

            return result;
        }
    }
}
