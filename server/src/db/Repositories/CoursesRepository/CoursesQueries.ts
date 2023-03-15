export const getAvailableCoursesQuery = (studentId: string) => `
    SELECT "course"."id" AS "id",
        "course"."name" AS "name",
        "teacher"."name" AS "teacherName",
        "teacher"."surname" AS "teacherSurname",
        "course_teacher"."id" AS "courseTeacherId",
        "student_course"."student_id"
    FROM "course"
    JOIN "course_teacher"
    ON "course_teacher"."course_id" = "course"."id"
    JOIN "teacher"
    ON "teacher"."id" = "course_teacher"."teacher_id"
    LEFT JOIN "student_course"
    ON "student_course"."course_teacher_id" = "course_teacher"."id"
    WHERE "student_course"."student_id" != '${studentId}' OR
          "student_course"."student_id" IS NULL;
`;

export const getAllCoursesQuery = () => `
    SELECT "course"."id" AS "id",
           "course"."name" AS "name",
           "teacher"."name" AS "teacherName",
           "teacher"."surname" AS "teacherSurname",
           "course_teacher"."id" AS "courseTeacherId"
    FROM "course"
    JOIN "course_teacher"
    ON "course_teacher"."course_id" = "course"."id"
    JOIN "teacher"
    ON "teacher"."id" = "course_teacher"."teacher_id"
`;

export const kickStudentQuery = (studentId: string, courseId: string) => `
    DELETE FROM "student_course"
    WHERE "student_course"."student_id" = '${studentId}' AND
        '${courseId}' IN (
        SELECT "course_teacher"."course_id"
        FROM "course_teacher"
        WHERE "course_teacher"."id" = "student_course"."course_teacher_id"
    )
`;

export const joinStudentQuery = (studentId: string, courseTeacherId: string) => `
    INSERT INTO "student_course" VALUES (
        gen_random_uuid(),
        '${studentId}',
        '${courseTeacherId}'
    )
`;
