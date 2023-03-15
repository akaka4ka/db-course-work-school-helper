import { Status } from "./../../../Types/ResultType.js";
import {
    findRegistrationTokenQuery,
    findUserByNameQuery,
    findUserByTokenQuery,
    getHTeacherInfo,
    getPrincipalInfo,
    getStudentInfo,
    registerUserQuery,
} from "./UserQueries.js";
import pool from "../../DBInit.js";
import { QueryResultType } from "../../QueryResultType.js";
import { QueryResult } from "pg";
import User from "../../models/User.js";
import Student from "../../models/Student.js";
import Principal from "../../models/Principal.js";
import HeadTeacher from "../../models/HeadTeacher.js";

class UserRepository {
    static async findByUserName(
        username: string
    ): Promise<QueryResultType<User>> {
        let result: QueryResultType<User>;

        try {
            const queryResult: QueryResult<any> = await pool.query(
                findUserByNameQuery(username)
            );
            const isUserExists: Boolean = queryResult.rowCount > 0;
            const row = queryResult.rows[0];

            result = {
                status: Status.SUCCESS,
                message: isUserExists
                    ? "Found user"
                    : `There is no user with username ${username}`,
                data: isUserExists
                    ? new User(
                          row.id,
                          row.username,
                          row.hashed_password,
                          row.role_id,
                          row.person_id
                      )
                    : null,
            };

            return result;
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: `Query error\n ${error}`,
                data: null,
            };

            return result;
        }
    }

    static async findByRegistrationToken(
        token: string
    ): Promise<QueryResultType<string>> {
        let result: QueryResultType<string>;

        try {
            const queryResult: QueryResult<any> = await pool.query(
                findUserByTokenQuery(token)
            );
            const isUserExists: Boolean = queryResult.rowCount > 0;
            const { username }: { username: string } = queryResult.rows[0] || {
                username: null,
            };

            result = {
                status: Status.SUCCESS,
                message: isUserExists
                    ? "Found user"
                    : `There is no user with username ${username}`,
                data: isUserExists ? username : null,
            };

            return result;
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: `Query error\n ${error}`,
                data: null,
            };

            return result;
        }
    }

    static async findRegistrationToken(
        token: string
    ): Promise<QueryResultType<string>> {
        let result: QueryResultType<string>;

        try {
            const queryResult: QueryResult<any> = await pool.query(
                findRegistrationTokenQuery(token)
            );
            const isTokenExists: Boolean = queryResult.rowCount > 0;

            result = {
                status: Status.SUCCESS,
                message: isTokenExists
                    ? "Token available"
                    : `There is no available token ${token}`,
                data: isTokenExists ? token : null,
            };

            return result;
        } catch (error) {
            result = {
                status: Status.FAILURE,
                message: `Query error\n ${error}`,
                data: null,
            };

            return result;
        }
    }

    static async addNewUser(
        username: string,
        hashedPassword: string,
        registrationToken: string
    ) {
        let result: QueryResultType<{
            userId: string;
            roleId: string;
        }>;

        try {
            const queryResult: QueryResult<any> = await pool.query(
                registerUserQuery(username, hashedPassword, registrationToken)
            );

            result = {
                status: Status.SUCCESS,
                message: "Register new user successfully",
                data: {
                    userId: queryResult.rows[0].id,
                    roleId: queryResult.rows[0].role_id,
                },
            };

            return result;
        } catch (error) {
            console.error(error);

            result = {
                status: Status.FAILURE,
                message: `Can't register user due to query error:\n ${error}`,
                data: null,
            };

            return result;
        }
    }

    static async getInfo(userId: string, roleId: string) {
        let result: QueryResultType<Student | Principal>;

        try {
            let queryResult: QueryResult<any>;

            if (roleId === "Ученик") {

                queryResult = await pool.query(getStudentInfo(userId));

                const row: any = queryResult.rows[0];

                result = {
                    status: Status.SUCCESS,
                    message: "Register new user successfully",
                    data: new Student(
                        row["studentId"],
                        row["name"],
                        row["surname"],
                        new Date(row["birthday_date"]),
                        row["gradeId"],
                        row["number"],
                        row["letter"]
                    ),
                };

                return result;
            }

            if (roleId === "Директор") {
                queryResult = await pool.query(getPrincipalInfo(userId));

                const row: any = queryResult.rows[0];

                result = {
                    status: Status.SUCCESS,
                    message: "Register new user successfully",
                    data: new Principal(
                        row["studentId"],
                        row["name"],
                        row["surname"],
                        new Date(row["birthday_date"])
                    ),
                };

                return result;
            }

            if (roleId === "Завуч") {
                queryResult = await pool.query(getHTeacherInfo(userId));

                const row: any = queryResult.rows[0];

                result = {
                    status: Status.SUCCESS,
                    message: "Register new user successfully",
                    data: new HeadTeacher(
                        row["studentId"],
                        row["name"],
                        row["surname"],
                        new Date(row["birthday_date"])
                    ),
                };

                return result;
            }

        } catch (error) {
            console.error(error);

            result = {
                status: Status.FAILURE,
                message: `Can't get user info with error:\n ${error}`,
                data: null,
            };

            return result;
        }
    }
}

export default UserRepository;
