import { Response } from "express";
import { Request } from "express";
import pkg from "jsonwebtoken";
const { verify } = pkg;

export const roleMiddleware = (roles: string[]) => {
    return (request: Request | any, response: Response, next: Function) => {
        if (request.method === "OPTIONS") {
            next();
        }

        try {
            const token = request.headers.authorization.split(" ")[1];
            if (!token) {
                response.status(403).json({ message: "User not authorised" });
            }

            const decoded: string | pkg.JwtPayload | any = verify(
                token,
                process.env.SECRET_TOKEN
            );
            const userRole: string = decoded.role;
            if (!roles.includes(userRole)) {
                response
                    .status(403)
                    .json({
                        message:
                            "User have no permission to perform current query",
                    });
            }

            request.userId = decoded.id;

            next();
        } catch (error) {
            console.error(error);
            response.status(403).json({ message: "User not authorised" });
        }
    };
};
