import { Router } from "express";
import controller from "../Controllers/LessonController.js";

import { roleMiddleware } from "../middleware/roleMiddleware.js";

const lessonRouter: Router = Router();

lessonRouter.get("/grade", roleMiddleware(["Ученик"]), controller.getGradeLessons);

export default lessonRouter;
