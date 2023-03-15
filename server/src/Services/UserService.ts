import { QueryResultType } from "../db/QueryResultType.js";
import UserRepository from "../db/Repositories/UserRepository/UserRepository.js";
import { ResultType, Status } from "./../Types/ResultType.js";
import User from "../db/models/User.js";
import { hashSync, compareSync } from "bcrypt";

import pkg from "jsonwebtoken";
import Student from "../db/models/Student.js";
import Principal from "../db/models/Principal.js";
const { sign } = pkg;

const generateAccessToken = (id: string, role: string): string => {
    const payload = {
        id,
        role,
    };

    return sign(payload, process.env.SECRET_TOKEN, { expiresIn: "24h" });
};

class UserService {
    static async register(
        username: string,
        password: string,
        registrationToken: string
    ): Promise<ResultType<string>> {
        let result: ResultType<string>;

        try {
            const findByNameResult: QueryResultType<User> =
                await UserRepository.findByUserName(username);

            if (findByNameResult.status === Status.SUCCESS) {
                if (findByNameResult.data !== null) {
                    result = {
                        status: Status.FAILURE,
                        message:
                            "Can't register new user.\n" +
                            "User with username " +
                            `${findByNameResult.data} already exists`,
                        data: findByNameResult.data.username,
                    };

                    return result;
                } else {
                    const findByTokenResult: QueryResultType<string> =
                        await UserRepository.findByRegistrationToken(
                            registrationToken
                        );

                    if (findByTokenResult.status === Status.SUCCESS) {
                        if (findByTokenResult.data !== null) {
                            result = {
                                status: Status.FAILURE,
                                message:
                                    "Can't register new user.\n" +
                                    "There is user with username " +
                                    `${findByTokenResult.data} ` +
                                    "already registered with this token",
                                data: findByTokenResult.data,
                            };

                            return result;
                        } else {
                            const findTokenResult: QueryResultType<string> =
                                await UserRepository.findRegistrationToken(
                                    registrationToken
                                );

                            if (findTokenResult.status === Status.SUCCESS) {
                                if (findTokenResult.data !== null) {
                                    const hashedPassword: string = hashSync(
                                        password,
                                        8
                                    );
                                    const registerResult: QueryResultType<{
                                        userId: string;
                                        roleId: string;
                                    }> = await UserRepository.addNewUser(
                                        username,
                                        hashedPassword,
                                        registrationToken
                                    );

                                    const token: string = generateAccessToken(
                                        registerResult.data.userId,
                                        registerResult.data.roleId
                                    );

                                    result = {
                                        status: registerResult.status,
                                        message: registerResult.message,
                                        data: token,
                                    };

                                    return result;
                                } else {
                                    result = {
                                        status: Status.FAILURE,
                                        message:
                                            "Can't register: " +
                                            `${findTokenResult.message}`,
                                        data: findTokenResult.data,
                                    };

                                    return result;
                                }
                            } else if (
                                findTokenResult.status === Status.FAILURE
                            ) {
                                result = {
                                    status: Status.FAILURE,
                                    message:
                                        "can't find token " +
                                        "due to query error: " +
                                        `${findTokenResult.message}`,
                                    data: findTokenResult.data,
                                };

                                return result;
                            }
                        }
                    } else if (findByTokenResult.status === Status.FAILURE) {
                        result = {
                            status: Status.FAILURE,
                            message:
                                "can't find user due to query error: " +
                                `${findByTokenResult.message}`,
                            data: findByTokenResult.data,
                        };

                        return result;
                    }
                }
            } else if (findByNameResult.status === Status.FAILURE) {
                result = {
                    status: Status.FAILURE,
                    message:
                        "can't find user due to query error: " +
                        `${findByNameResult.message}`,
                    data: null,
                };

                return result;
            }
        } catch (error) {
            console.error(error);

            result = {
                status: Status.FAILURE,
                message: `Registration error: ${error}`,
                data: null,
            };

            return result;
        }
    }

    static async login(
        username: string,
        password: string
    ): Promise<ResultType<string>> {
        let result: ResultType<string>;

        try {
            const findUserResult: QueryResultType<User> =
                await UserRepository.findByUserName(username);

            if (findUserResult.status === Status.SUCCESS) {
                if (findUserResult.data !== null) {
                    const isPasswordValid: boolean = compareSync(
                        password,
                        findUserResult.data.hashedPassword
                    );

                    if (!isPasswordValid) {
                        result = {
                            status: Status.FAILURE,
                            message: "Incorrect password!",
                            data: null,
                        };

                        return result;
                    }

                    const token: string = generateAccessToken(
                        findUserResult.data.id,
                        findUserResult.data.roleId
                    );

                    result = {
                        status: Status.SUCCESS,
                        message: "Correct! Login success",
                        data: token,
                    };

                    return result;
                } else {
                }
            } else if (findUserResult.status === Status.FAILURE) {
                result = {
                    status: findUserResult.status,
                    message: findUserResult.message,
                    data: null,
                };
            }

            return result;
        } catch (error) {
            console.error(error);

            result = {
                status: Status.FAILURE,
                message: `Registration error: ${error}`,
                data: null,
            };

            return result;
        }
    }

    static async getAuth(
        userId: string,
        roleId: string
    ): Promise<ResultType<string>> {
        if (!userId || !roleId) {
            return {
                status: Status.FAILURE,
                message: "Caught invalid argument",
                data: null,
            };
        }
        const token: string = generateAccessToken(userId, roleId);

        return {
            status: Status.SUCCESS,
            message: "Regenerate token successfully",
            data: token,
        };
    }

    static async getInfo(userId: string, roleId: string) {
        if (!userId || !roleId) {
            return {
                status: Status.FAILURE,
                message: "Caught invalid argument",
                data: null,
            };
        }

        let result: ResultType<Student | Principal>;

        try {
            const findUserResult = await UserRepository.getInfo(userId, roleId);

            if (findUserResult.status === Status.SUCCESS) {
                result = {
                    status: Status.SUCCESS,
                    message: "Found user info",
                    data: findUserResult.data,
                };
                return result;
            }
        } catch (error) {
            console.log(error);
            
            result = {
                status: Status.FAILURE,
                message: "UserService: Can't get user info",
                data: null,
            };
            return result;
        }
    }
}

export default UserService;
