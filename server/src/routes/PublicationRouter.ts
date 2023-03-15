import { Router } from "express";

import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import controller from "../Controllers/PublicationController.js";

const publicationRouter: Router = Router();

publicationRouter.get("/getAll", authMiddleware, controller.getAll);

export default publicationRouter;
