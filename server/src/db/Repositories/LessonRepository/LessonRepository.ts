import { QueryResult } from "pg";
import { Status } from "../../../Types/ResultType.js";
import pool from "../../DBInit.js";
import { QueryResultType } from "../../QueryResultType.js";
import { getGradeLessonsQuery } from "./LessonQueries.js";

export interface GradeLesson {
    id: string;
    disciplineName: string;
    teacherName: string;
    teacherSurname: string;
    date: string;
    classroom: string;
}

export class LessonRepository {
    static async getGradeLessons(gradeId: string) {
        let result: QueryResultType<GradeLesson[]> = {
            status: Status.FAILURE,
            message: "Can't get lessons",
            data: [],
        };

        try {
            let queryResult: QueryResult<any>;
            queryResult = await pool.query(getGradeLessonsQuery(gradeId));

            const rows = queryResult.rows;
            rows.forEach((item) =>
                result.data.push({
                    id: item.lessonId,
                    disciplineName: item.disciplineName,
                    teacherName: item.teacherName,
                    teacherSurname: item.teacherSurname,
                    date: item.date,
                    classroom: item.classroom
                })
            );

            result = {
                status: Status.SUCCESS,
                message: "Found grade lessons",
                data: result.data,
            };

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }
}
