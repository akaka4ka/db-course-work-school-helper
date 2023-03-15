import { Router } from "express";

import coursesRouter from "./CoursesRouter.js";
import disciplineRouter from "./DisciplinesRouter.js";
import lessonRouter from "./LessonsRouter.js";
import publicationRouter from "./PublicationRouter.js";
import studentRouter from "./StudentsRouter.js";
import teacherRouter from "./TeachersRouter.js";
import userRouter from "./UserRouter.js";

const router = Router();

router.use('/lessons', lessonRouter);
// router.use('/extraLessons');
router.use('/disciplines', disciplineRouter);
router.use('/courses', coursesRouter);
// router.use('/grades');
router.use('/student', studentRouter);
router.use('/teachers', teacherRouter);
// router.use('/headTeachers');
// router.use('/principal');
router.use('/user', userRouter);
router.use('/publications', publicationRouter);

export default router;
