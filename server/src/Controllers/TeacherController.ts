import { Request, Response } from "express";
import { QueryResult } from "pg";
import pool from "../db/DBInit.js";
import {
    HTeacher,
    Teacher,
} from "../db/Repositories/TeacherRepository/TeacherRepository.js";
import { TeacherService } from "../Services/TeacherService.js";
import { ResultType, Status } from "../Types/ResultType.js";
import { v4 as uuid } from "uuid";

class TeacherController {
    static async getAll(request: Request | any, response: Response) {
        try {
            const result: ResultType<Teacher[]> = await TeacherService.getAll();

            if (result.status === Status.SUCCESS) {
                response.status(200).json(result.data);
            } else {
                response.status(200).json([]);
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get teachers" });
        }
    }

    static async getAllH(request: Request | any, response: Response) {
        try {
            const result: ResultType<HTeacher[]> =
                await TeacherService.getAllH();

            if (result.status === Status.SUCCESS) {
                response.status(200).json(result.data);
            } else {
                response.status(200).json([]);
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get teachers" });
        }
    }

    static async addHTeacher(request: Request | any, response: Response) {
        const { name, surname, birthday }: any = request.body;

        if (!name || !surname || !birthday) {
            response.status(403).json({ message: "dura" });
        }

        let result: ResultType<string> = {
            status: Status.FAILURE,
            message: "dura!",
            data: "",
        };

        try {
            const addHTeacherQueryResult: QueryResult<any> = await pool.query(`
                INSERT INTO "head_teacher"
                VALUES (gen_random_uuid(), '${name}', '${surname}', '${birthday}', CURRENT_DATE)
                RETURNING "id";
            `);

            if (addHTeacherQueryResult.rowCount > 0) {
                const hTeacherId = addHTeacherQueryResult.rows[0].id;

                const addRegTokenQueryResult: QueryResult<any> =
                    await pool.query(`
                        INSERT INTO "registration_token"
                        VALUES (gen_random_uuid(), '${uuid().substring(
                            0,
                            8
                        )}', '${hTeacherId}', 'Завуч', FALSE)
                        RETURNING "token";
                    `);

                if (addRegTokenQueryResult.rowCount > 0) {
                    const token = addRegTokenQueryResult.rows[0].token;

                    response.status(200).json({ regToken: token });
                }
            }

            return result;
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get teachers" });
        }
    }

    static async addTeacher(request: Request | any, response: Response) {
        const { name, surname, birthday, disciplines }: any = request.body;

        if (
            !name ||
            !surname ||
            !birthday ||
            !disciplines ||
            !disciplines.length
        ) {
            response.status(403).json({ message: "dura" });
        }

        let result: ResultType<string> = {
            status: Status.FAILURE,
            message: "dura!",
            data: "",
        };

        try {
            const addTeacherQueryResult: QueryResult<any> = await pool.query(`
                INSERT INTO "teacher"
                VALUES (gen_random_uuid(), '${name}', '${surname}', '${birthday}', CURRENT_DATE)
                RETURNING "id";
            `);

            if (addTeacherQueryResult.rowCount > 0) {
                const teacherId = addTeacherQueryResult.rows[0].id;

                const addRegTokenQueryResult: QueryResult<any> =
                    await pool.query(`
                        INSERT INTO "registration_token"
                        VALUES (gen_random_uuid(), '${uuid().substring(
                            0,
                            8
                        )}', '${teacherId}', 'Учитель', FALSE)
                        RETURNING "token";
                    `);

                if (addRegTokenQueryResult.rowCount > 0) {
                    const token = addRegTokenQueryResult.rows[0].token;

                    for (const disc of disciplines) {
                        const addTeacherDisciplines: QueryResult<any> =
                            await pool.query(`
                            INSERT INTO "teacher_discipline"
                            VALUES (gen_random_uuid(), '${teacherId}', '${disc}')
                        `);
                    }

                    response.status(200).json({ regToken: token });
                }
            }

            return result;
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get teachers" });
        }
    }

    static async getDisciplines(request: Request | any, response: Response) {
        const { teacherId }: any = request.body;

        if (!teacherId) {
            response.status(403).json({ message: "dura" });
            return;
        }

        try {
            const getDiscQueryResult: QueryResult<any> = await pool.query(`
                        SELECT "discipline"."id"
                        FROM "discipline"
                        JOIN "teacher_discipline"
                        ON "teacher_discipline"."discipline_id" = "discipline"."id"
                        WHERE "teacher_discipline"."teacher_id" = '${teacherId}'
                    `);

            if (getDiscQueryResult.rowCount >= 0) {
                const disciplines: any = [];

                for (const item of getDiscQueryResult.rows) {
                    disciplines.push(item.id);
                }

                response.status(200).json(disciplines);
            } else {
                response.status(200).json([]);
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get teachers" });
        }
    }

    static async updateTeacher(request: Request | any, response: Response) {
        const { teacherId, name, surname, birthday }: any = request.body;

        if (!teacherId || !name || !surname || !birthday) {
            response.status(403).json({ message: "dura" });
            return;
        }

        try {
            const updateQueryResult: QueryResult<any> = await pool.query(`
                        UPDATE "teacher"
                        SET "name" = '${name}',
                            "surname" = '${surname}',
                            "birthday_date" = '${birthday}'
                        WHERE "id" = '${teacherId}'
                    `);

            response.status(200).json({ message: "updated" });
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get teachers" });
        }
    }

    static async updateTeacherDisc(request: Request | any, response: Response) {
        const { teacherId, disc }: any = request.body;

        if (!teacherId || !disc || disc.lenght <= 0) {
            response.status(403).json({ message: "dura" });
            return;
        }

        try {
            const getDiscQueryResult: QueryResult<any> = await pool.query(`
                        SELECT "discipline"."id"
                        FROM "discipline"
                        JOIN "teacher_discipline"
                        ON "teacher_discipline"."discipline_id" = "discipline"."id"
                        WHERE "teacher_discipline"."teacher_id" = '${teacherId}'
                    `);

            const disciplines: any = [];

            for (const item of getDiscQueryResult.rows) {
                disciplines.push(item.id);
            }

            const deleted = disc.filter((x) => disciplines.includes(x));
            const insert = disc.filter((x) => !disciplines.includes(x));

            const getTDDiscTDQueryResult: QueryResult<any> = await pool.query(`
                SELECT "teacher_discipline"."id"
                FROM "teacher_discipline"
                WHERE teacher_id = '${teacherId}' AND
                      discipline_id = ANY('{${deleted.map(item => `"${item}"`).join(",")}}');
            `);

            const deletedTD = [];
            for (const item of getTDDiscTDQueryResult.rows) {
                deletedTD.push(item.id);
            }

            for (const item of deletedTD) {
                const updateLesQueryResult: QueryResult<any> = await pool.query(`
                    UPDATE "lesson"
                    SET "teacher_discipline_id" = NULL
                    WHERE "lesson"."teacher_discipline_id" = '${item}'
                `);

                const deleteTDiscQueryResult: QueryResult<any> = await pool.query(`
                    DELETE FROM "teacher_discipline"
                    WHERE "teacher_discipline"."id" = '${item}'
                `);
            }

            for (const item of insert) {
                const insertTDiscQueryResult: QueryResult<any> = await pool.query(`
                    INSERT INTO "teacher_discipline"
                    VALUES (
                        gen_random_uuid(), '${teacherId}', '${item}'
                    )
                `);
            }

            response.status(200).json({ message: deletedTD });
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get teachers" });
        }
    }
}

export default TeacherController;
