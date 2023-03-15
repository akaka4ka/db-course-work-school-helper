import { QueryResultType } from "../db/QueryResultType.js";
import { GradeLesson, LessonRepository } from "../db/Repositories/LessonRepository/LessonRepository.js";
import { ResultType, Status } from "../Types/ResultType.js";

export class LessonService {
    static async getGradeLessons(gradeId: string) {
        if (!gradeId) {
            return {
                status: Status.FAILURE,
                message: "Caught invalid argument",
                data: null,
            };
        }

        let result: ResultType<GradeLesson[]>;

        try {
            const findLessonsResult = await LessonRepository.getGradeLessons(
                gradeId
            );

            if (findLessonsResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: findLessonsResult.message,
                    data: findLessonsResult.data,
                };

                return result;
            }
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: "Can't find grade lessons",
                data: null,
            };

            return result;
        }
    }
}
