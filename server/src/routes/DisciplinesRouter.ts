import { Router } from "express";
import controller from "../Controllers/DisciplineController.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const disciplineRouter: Router = Router();

disciplineRouter.get("/getAll", roleMiddleware(["Директор"]), controller.getAll);

export default disciplineRouter;
