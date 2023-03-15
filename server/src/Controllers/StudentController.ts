import { Request, Response } from "express";
import {
    MarksWithDates,
    Mate,
    StudentCourse,
    StudentFP,
    StudentMarks,
} from "../db/Repositories/StudentRepository/StudentRepository.js";
import { StudentService } from "../Services/StudentService.js";
import { ResultType, Status } from "../Types/ResultType.js";

class StudentController {
    static async deleteStudent(request: Request | any, response: Response) {
        const { id }: any = request.body;

        try {
            const result: ResultType<string> =
                await StudentService.deleteStudent(id);

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ message: result.message });
            } else {
                response.status(403).json({
                    message: "Can't add student",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't add student" });
        }
    }

    static async updateStudent(request: Request | any, response: Response) {
        const { id, name, surname, birthday, gradeId }: any = request.body;

        try {
            const result: ResultType<string> =
                await StudentService.updateStudent(
                    id,
                    name,
                    surname,
                    birthday,
                    gradeId
                );

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ message: result.message });
            } else {
                response.status(403).json({
                    message: "Can't add student",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't add student" });
        }
    }

    static async addStudent(request: Request | any, response: Response) {
        const { name, surname, birthday, gradeId }: any = request.body;

        try {
            const result: ResultType<string> = await StudentService.addStudent(
                name,
                surname,
                birthday,
                gradeId
            );

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ regToken: result.data });
            } else {
                response.status(403).json({
                    message: "Can't add student",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't add student" });
        }
    }

    static async getAllStudents(
        request: Request | any,
        response: Response
    ): Promise<void> {
        try {
            const result: ResultType<StudentFP[]> =
                await StudentService.getAllStudents();

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ courses: result.data });
            } else {
                response.status(403).json({
                    message: "Can't get students",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get students" });
        }
    }

    static async getOwnCourses(
        request: Request | any,
        response: Response
    ): Promise<void> {
        const userId = request.userId;

        try {
            const result: ResultType<StudentCourse[]> =
                await StudentService.getOwnCourses(userId);

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ courses: result.data });
            } else {
                response.status(403).json({
                    message: "Can't get student courses",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get student courses" });
        }
    }

    static async getAllMarks(
        request: Request | any,
        response: Response
    ): Promise<void> {
        const studentId = request.query.studentId;

        if (!studentId) {
            response.status(403).json({
                message: "Can't get student marks: invalid req params",
            });
        }

        try {
            const result: ResultType<StudentMarks[]> =
                await StudentService.getAllMarks(studentId);

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ courses: result.data });
            } else {
                response.status(403).json({
                    message: "Can't get user marks",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get user marks" });
        }
    }

    static async getMarksWithDate(
        request: Request | any,
        response: Response
    ): Promise<void> {
        const studentId = request.query.studentId;
        const disciplineId = request.query.disciplineId;

        if (!studentId || !disciplineId) {
            response.status(403).json({
                message: "Can't get student marks: invalid req params",
            });

            return;
        }

        try {
            const result: ResultType<MarksWithDates[]> =
                await StudentService.getMarksWithDate(studentId, disciplineId);

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ courses: result.data });
            } else {
                response.status(403).json({
                    message: "Can't get user marks",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get user marks" });
        }
    }

    static async getMates(
        request: Request | any,
        response: Response
    ): Promise<void> {
        const studentId = request.query.studentId;
        const gradeId = request.query.gradeId;

        if (!studentId || !gradeId) {
            response.status(403).json({
                message: "Can't get student mates: invalid req params",
            });

            return;
        }

        try {
            const result: ResultType<Mate[]> = await StudentService.getMates(
                studentId,
                gradeId
            );

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ courses: result.data });
            } else {
                response.status(403).json({
                    message: "Can't get user mates",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get user mates" });
        }
    }
}

export default StudentController;
