import { QueryResultType } from "../db/QueryResultType.js";
import {
    Course,
    CoursesRepository,
} from "../db/Repositories/CoursesRepository/CoursesRepository.js";
import { ResultType, Status } from "../Types/ResultType.js";

export class CoursesService {
    static async getAvailableCourses(studentId: string) {
        let result: ResultType<Course[]>;
        let findCoursesResult: QueryResultType<Course[]>;

        try {
            const findCoursesResult = await CoursesRepository.getAvailableCourses(studentId);

            if (findCoursesResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: "Found courses",
                    data: findCoursesResult.data,
                };

                return result;
            }
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: findCoursesResult.message,
                data: null,
            };

            return result;
        }
    }

    static async getCourses() {
        let result: ResultType<Course[]>;
        let findCoursesResult: QueryResultType<Course[]>;

        try {
            const findCoursesResult = await CoursesRepository.getCourses();

            if (findCoursesResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: "Found courses",
                    data: findCoursesResult.data,
                };

                return result;
            }
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: findCoursesResult.message,
                data: null,
            };

            return result;
        }
    }

    static async kickStudent(studentId: string, courseId: string) {
        let result: ResultType<null>;

        result = {
            status: Status.FAILURE,
            message: "Can't kick student",
            data: null,
        }
        
        if (!studentId || !courseId) {
            return result;
        }

        let kickStudentResult: QueryResultType<null>;

        try {
            const kickStudentResult = await CoursesRepository.kickStudent(studentId, courseId);

            if (kickStudentResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: kickStudentResult.message,
                    data: kickStudentResult.data,
                };

                return result;
            } else {
                result = {
                    status: Status.FAILURE,
                    message: kickStudentResult.message,
                    data: null,
                };
    
                return result;
            }
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: kickStudentResult.message,
                data: null,
            };

            return result;
        }
    }

    static async joinStudent(studentId: string, courseTeacherId: string) {
        const errorMessage = "Can't join student";
        let result: ResultType<null>;

        result = {
            status: Status.FAILURE,
            message: errorMessage,
            data: null,
        }
        
        if (!studentId || !courseTeacherId) {
            return result;
        }

        let joinStudentResult: QueryResultType<null>;

        try {
            const joinStudentResult = await CoursesRepository.joinStudent(studentId, courseTeacherId);

            if (joinStudentResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: joinStudentResult.message,
                    data: joinStudentResult.data,
                };

                return result;
            } else {
                result = {
                    status: Status.FAILURE,
                    message: joinStudentResult.message,
                    data: null,
                };
    
                return result;
            }
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: joinStudentResult.message,
                data: null,
            };

            return result;
        }
    }
}
