import { Router } from "express";

import { roleMiddleware } from "../middleware/roleMiddleware.js";
import controller from "../Controllers/StudentController.js";

const studentRouter: Router = Router();

studentRouter.get("/courses/own", roleMiddleware(["Ученик"]), controller.getOwnCourses);
studentRouter.get("/marks", roleMiddleware(["Ученик"]), controller.getAllMarks);
studentRouter.get("/marksByDiscipline", roleMiddleware(["Ученик"]), controller.getMarksWithDate);
studentRouter.get("/getMates", roleMiddleware(["Ученик"]), controller.getMates);
studentRouter.get("/getAll", roleMiddleware(["Директор"]), controller.getAllStudents);
studentRouter.post("/add", roleMiddleware(["Директор"]), controller.addStudent);
studentRouter.post("/update", roleMiddleware(["Директор"]), controller.updateStudent);
studentRouter.post("/del", roleMiddleware(["Директор"]), controller.deleteStudent);

export default studentRouter;
