import { Router } from "express";
import controller from "../Controllers/TeacherController.js";

import { roleMiddleware } from "../middleware/roleMiddleware.js";

const teacherRouter: Router = Router();

teacherRouter.get("/getAll", roleMiddleware(["Директор"]), controller.getAll);
teacherRouter.get("/getAllH", roleMiddleware(["Директор"]), controller.getAllH);
teacherRouter.post("/addHTeacher", roleMiddleware(["Директор"]), controller.addHTeacher);
teacherRouter.post("/addTeacher", roleMiddleware(["Директор"]), controller.addTeacher);
teacherRouter.post("/getDisciplines", roleMiddleware(["Директор"]), controller.getDisciplines);
teacherRouter.post("/updateTeacher", roleMiddleware(["Директор"]), controller.updateTeacher);
teacherRouter.post("/updateTeacherDisc", roleMiddleware(["Директор"]), controller.updateTeacherDisc);

export default teacherRouter;
