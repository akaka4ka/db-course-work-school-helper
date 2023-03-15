import { Router } from "express";
import controller from "../Controllers/CoursesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const coursesRouter: Router = Router();

coursesRouter.get("/available", authMiddleware, controller.getAvailableCourses);
coursesRouter.post(
    "/kickStudent",
    roleMiddleware(["Ученик", "Завуч", "Директор"]),
    controller.kickStudent
);
coursesRouter.post(
    "/joinStudent",
    roleMiddleware(["Ученик", "Завуч", "Директор"]),
    controller.joinStudent
);

export default coursesRouter;
