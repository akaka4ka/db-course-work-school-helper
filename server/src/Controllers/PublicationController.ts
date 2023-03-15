import { Request, Response } from "express";
import { QueryResult } from "pg";
import pool from "../db/DBInit.js";
import { TeacherService } from "../Services/TeacherService.js";
import { ResultType, Status } from "../Types/ResultType.js";

interface Publication {
    id: string;
    name: string;
    author: string;
    text: string;
    date: Date;
}

class PublicationController {
    static async getAll(request: Request | any, response: Response) {
        try {
            const getQueryResult: QueryResult<any> = await pool.query(`
                SELECT "id", "name", "text", "publication_date" AS "date", "author_name" AS "author" FROM "publication"
            `);

            if (getQueryResult.rowCount > 0) {
                const res: Publication[] = [];

                for (const item of getQueryResult.rows) {
                    res.push({
                        id: item.id,
                        name: item.name,
                        author: item.author,
                        text: item.text,
                        date: new Date(item.date),
                    });
                }

                response.status(200).json(res);
            } else {
                response.status(200).json([]);
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get teachers" });
        }
    }
}

export default PublicationController;
