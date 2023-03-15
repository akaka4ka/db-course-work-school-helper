export const getAllTeachersQuery = () => `
    SELECT "teacher"."id",
           "teacher"."name",
           "teacher"."surname",
           "teacher"."birthday_date" AS "birthdayDate",
           STRING_AGG("discipline"."name", ', ') AS "disciplines",
           STRING_AGG("course"."name", ', ') AS "courses"
    FROM "teacher"
    LEFT JOIN "teacher_discipline"
    ON "teacher_discipline"."teacher_id" = "teacher"."id"
    LEFT JOIN "discipline"
    ON "discipline"."id" = "teacher_discipline"."discipline_id"
    LEFT JOIN "course_teacher"
    ON "course_teacher"."teacher_id" = "teacher"."id"
    LEFT JOIN "course"
    ON "course"."id" = "course_teacher"."course_id"
    WHERE "teacher"."fire_date" IS NULL
    GROUP BY "teacher"."id",
             "teacher"."name",
             "teacher"."surname",
             "teacher"."birthday_date";
`;

export const getAllHTeachersQuery = () => `
    SELECT "head_teacher"."id",
           "head_teacher"."name",
           "head_teacher"."surname",
           "head_teacher"."birthday_date" AS "birthdayDate"
    FROM "head_teacher"
    WHERE "head_teacher"."fire_date" IS NULL;
`;
