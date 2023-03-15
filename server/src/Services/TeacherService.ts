import { HTeacher, Teacher, TeacherRepository } from "../db/Repositories/TeacherRepository/TeacherRepository.js";
import { ResultType, Status } from "../Types/ResultType.js";

export class TeacherService {
    static async getAll() {
        let result: ResultType<Teacher[]>;

        result = {
            status: Status.FAILURE,
            message: "Can't get teachers",
            data: null,
        };

        try {
            const getTeachersResult = await TeacherRepository.getAll();

            if (getTeachersResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: getTeachersResult.message,
                    data: getTeachersResult.data,
                };

                return result;
            }

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async getAllH() {
        let result: ResultType<HTeacher[]>;

        result = {
            status: Status.FAILURE,
            message: "Can't get teachers",
            data: null,
        };

        try {
            const getTeachersResult = await TeacherRepository.getAllH();

            if (getTeachersResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: getTeachersResult.message,
                    data: getTeachersResult.data,
                };

                return result;
            }

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }
}
