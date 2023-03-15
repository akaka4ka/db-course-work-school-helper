import { ResultType, Status } from "./../Types/ResultType.js";
import { Request, Response } from "express";
import UserService from "../Services/UserService.js";
import { Result, ValidationError, validationResult } from "express-validator";
import User from "../db/models/User.js";
import Student from "../db/models/Student.js";
import Principal from "../db/models/Principal.js";

class UserController {
    static async registration(
        request: Request,
        response: Response
    ): Promise<void> {
        const errors: Result<ValidationError> = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(400).json({
                message: "Registration error: ",
                errors,
            });
            return;
        }

        const {
            username,
            password,
            registrationToken,
        }: {
            username: string;
            password: string;
            registrationToken: string;
        } = request.body;

        try {
            let result: ResultType<string> = await UserService.register(
                username,
                password,
                registrationToken
            );

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ token: result.data });
            } else if (result.status === Status.FAILURE) {
                response.status(400).json(result.message);
            }
        } catch (error) {
            console.error(`Query error: ${error}`);
            response.status(400).json(`Sorry. Query error.`);
        }
    }

    static async login(request: Request, response: Response): Promise<void> {
        const {
            username,
            password,
        }: {
            username: string;
            password: string;
        } = request.body;

        try {
            const result: ResultType<string> = await UserService.login(
                username,
                password
            );
                console.log(result);
                
            response.status(200).json({ token: result.data });
        } catch (error) {
            console.error(`Query error: ${error}`);
            response.status(400).json({ message: "Query error: ", error });
        }
    }

    static async getAuth(
        request: Request | any,
        response: Response
    ): Promise<void> {
        const user: { id: string; role: string } = request.user;

        try {
            const result: ResultType<string> = await UserService.getAuth(
                user.id,
                user.role
            );

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ token: result.data });
            } else {
                response.status(403).json({
                    message: "Can't auth user",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't auth user" });
        }
    }

    static async getInfo(
        request: Request | any,
        response: Response
    ): Promise<void> {
        const user: { id: string; role: string } = request.user;

        try {
            const result: ResultType<Student | Principal> = await UserService.getInfo(
                user.id,
                user.role
            );

            if (result.status === Status.SUCCESS) {
                response.status(200).json({ userInfo: result.data });
            } else {
                response.status(403).json({
                    message: "Can't get user info",
                    error: result.message,
                });
            }
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "Can't get user info" });
        }
    }

    static async getUsers(request: Request, response: Response): Promise<void> {
        try {
            response.json("fuxociety");
        } catch (error) {}
    }
}

export default UserController;
