import { Request, Response } from "express";
import { Course } from "../db/Repositories/CoursesRepository/CoursesRepository.js";
import { CoursesService } from "../Services/CoursesService.js";
import { ResultType, Status } from "../Types/ResultType.js";

class CourseController {
    static async getAvailableCourses(
        request: Request | any,
        response: Response
    ): Promise<void> {
        const {
            studentId,
        }: {
            studentId: string;
        } = request.query;

        if (!studentId) {
            response.status(403).json({
                message:
                    "Can't get student available courses: invalid req params",
                params: request.query,
            });

            return;
        }

        try {
            const result: ResultType<Course[]> =
                await CoursesService.getAvailableCourses(studentId);

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ courses: result.data });
            } else {
                response.status(403).json({
                    message: "Can't get courses",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get courses" });
        }
    }

    static async getCourses(
        request: Request | any,
        response: Response
    ): Promise<void> {
        try {
            const result: ResultType<Course[]> =
                await CoursesService.getCourses();

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ courses: result.data });
            } else {
                response.status(403).json({
                    message: "Can't get courses",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get courses" });
        }
    }

    static async kickStudent(
        request: Request | any,
        response: Response
    ): Promise<void> {
        const {
            studentId,
            courseId,
        }: {
            studentId: string;
            courseId: string;
        } = request.body;

        if (!studentId || !courseId) {
            response.status(403).json({
                message: "Can't kick student from course: invalid req body",
            });
        }

        try {
            const result: ResultType<null> = await CoursesService.kickStudent(
                studentId,
                courseId
            );

            if (result.status === Status.SUCCESS) {
                response
                    .status(200)
                    .json({ message: "Kicked student from course" });
            } else {
                response.status(403).json({
                    message: "Can't kick student from course",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response
                .status(403)
                .json({ message: "Can't kick student from course" });
        }
    }

    static async joinStudent(
        request: Request | any,
        response: Response
    ): Promise<void> {
        const {
            studentId,
            courseTeacherId,
        }: {
            studentId: string;
            courseTeacherId: string;
        } = request.body;

        if (!studentId || !courseTeacherId) {
            response.status(403).json({
                message: "Can't join student to course: invalid req body",
            });
        }

        try {
            const result: ResultType<null> = await CoursesService.joinStudent(
                studentId,
                courseTeacherId
            );

            if (result.status === Status.SUCCESS) {
                response
                    .status(200)
                    .json({ message: "Joined student to course" });
            } else {
                response.status(403).json({
                    message: "Can't join student to course",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response
                .status(403)
                .json({ message: "Can't join student to course" });
        }
    }
}

export default CourseController;
