import { Router } from "express";
import { check } from "express-validator";
import controller from "../Controllers/UserController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const userRouter: Router = Router();

userRouter.post(
    "/registration",
    [
        check("username", "User name can't be empty").notEmpty(),
        check(
            "password",
            "Password must be at least 8 characters and not more 16 characters long"
        ).isLength({ min: 8, max: 16 }),
    ],
    controller.registration
);
userRouter.post("/login", controller.login);
userRouter.get("/auth", authMiddleware, controller.getAuth);
userRouter.get("/getInfo", authMiddleware, controller.getInfo);

userRouter.get("/users", roleMiddleware(["Ученик"]), controller.getUsers);

export default userRouter;
