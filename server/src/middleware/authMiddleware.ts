import e, { Response } from "express";
import { Request } from "express";
import pkg from "jsonwebtoken";
const { verify } = pkg;

export const authMiddleware = (
    request: Request | any,
    response: Response,
    next: Function
): void => {
    if (request.method === "OPTIONS") {
        next();
    }

    try {
        const token = request.headers.authorization.split(" ")[1];
        if (!token) {
            response.status(403).json({ message: "User not authorised" });
        }

        const decoded = verify(token, process.env.SECRET_TOKEN);
        
        request.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        response.status(403).json({ message: "User not authorised" });
    }
};
