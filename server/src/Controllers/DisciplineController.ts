import { QueryResult } from "pg";
import { Request, Response } from "express";
import {
    HTeacher,
    Teacher,
} from "../db/Repositories/TeacherRepository/TeacherRepository.js";
import { TeacherService } from "../Services/TeacherService.js";
import { ResultType, Status } from "../Types/ResultType.js";
import pool from "../db/DBInit.js";

interface Disciplines {
    id: string;
    name: string;
}

class DisciplineController {
    static async getAll(request: Request | any, response: Response) {
        try {
            const result: Disciplines[] = [];

            const qResult: QueryResult<any> = await pool.query(`
                SELECT "discipline"."id", "discipline"."name"
                FROM "discipline"
            `);

            if (qResult.rowCount > 0) {
                for (const item of qResult.rows) {
                    result.push({
                        id: item.id,
                        name: item.name,
                    });
                }

                response.status(200).json(result);
            } else {
                response.status(200).json([]);
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get disciplines" });
        }
    }
}

export default DisciplineController;
