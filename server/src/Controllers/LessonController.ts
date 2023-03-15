import { Request, Response } from "express";
import { GradeLesson } from "../db/Repositories/LessonRepository/LessonRepository.js";
import { LessonService } from "../Services/LessonService.js";
import { ResultType, Status } from "../Types/ResultType.js";

class LessonController {
    static async getGradeLessons(
        request: Request | any,
        response: Response
    ): Promise<void> {
        const gradeId = request.query.gradeId;

        if (!gradeId) {
            response.status(403).json({ message: "Caught invalid arguments: gradeId" });
            return;
        }

        try {
            const result: ResultType<GradeLesson[]> =
                await LessonService.getGradeLessons(gradeId);

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ courses: result.data });
            } else {
                response.status(403).json({
                    message: "Controller: can't get grade lessons",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get grade lessons" });
        }
    }
}

export default LessonController;
