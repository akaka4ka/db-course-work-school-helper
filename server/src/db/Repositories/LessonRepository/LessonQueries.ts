export const getGradeLessonsQuery = (gradeId: string) => `
    SELECT "lesson"."id" AS "lessonId",
           "discipline"."name" AS "disciplineName",
           "teacher"."name" AS "teacherName",
           "teacher"."surname" AS "teacherSurname",
           "lesson"."date_time" AS "date",
           "lesson"."classroom" AS "classroom"
    FROM "lesson"
    JOIN "teacher_discipline"
    ON "lesson"."teacher_discipline_id" = "teacher_discipline"."id"
    JOIN "discipline"
    ON "lesson"."discipline_id" = "discipline"."id"
    JOIN "teacher"
    ON "teacher_discipline"."teacher_id" = "teacher"."id"
    WHERE "lesson"."grade_id" = '${gradeId}'
`;
