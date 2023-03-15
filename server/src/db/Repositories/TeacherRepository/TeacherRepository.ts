import { QueryResult } from "pg";
import { Status } from "../../../Types/ResultType.js";
import pool from "../../DBInit.js";
import { QueryResultType } from "../../QueryResultType.js";
import { getAllHTeachersQuery, getAllTeachersQuery } from "./TeacherQueries.js";

export interface Teacher {
    id: string;
    name: string;
    surname: string;
    birthdayDate: string;
    disciplines: string;
    courses: string;
}

export interface HTeacher {
    id: string;
    name: string;
    surname: string;
    birthdayDate: string;
}

export class TeacherRepository {
    static async getAll() {
        let result: QueryResultType<Teacher[]> = {
            status: Status.FAILURE,
            message: "TeacherRepo: Can't find teachers",
            data: [],
        };

        try {
            const getTeachersQueryResult: QueryResult<any> = await pool.query(
                getAllTeachersQuery()
            );

            if (getTeachersQueryResult.rowCount > 0) {
                result = {
                    status: Status.SUCCESS,
                    message: "TeacherRepo: Found teachers",
                    data: [],
                };

                for (const item of getTeachersQueryResult.rows) {
                    result.data.push({
                        id: item.id,
                        name: item.name,
                        surname: item.surname,
                        birthdayDate: item.birthdayDate,
                        disciplines: item.disciplines,
                        courses: item.courses,
                    });
                }
            }

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }

    static async getAllH() {
        let result: QueryResultType<HTeacher[]> = {
            status: Status.FAILURE,
            message: "TeacherRepo: Can't find teachers",
            data: [],
        };

        try {
            const getHTeachersQueryResult: QueryResult<any> = await pool.query(
                getAllHTeachersQuery()
            );

            if (getHTeachersQueryResult.rowCount > 0) {
                result = {
                    status: Status.SUCCESS,
                    message: "TeacherRepo: Found teachers",
                    data: [],
                };

                for (const item of getHTeachersQueryResult.rows) {
                    result.data.push({
                        id: item.id,
                        name: item.name,
                        surname: item.surname,
                        birthdayDate: item.birthdayDate,
                    });
                }
            }

            return result;
        } catch (error) {
            console.log(error);
            return result;
        }
    }
}
