import { v4 as uuid } from "uuid";

export const getOwnCourses = (studentId: string) => `
    SELECT "course"."id" AS "id",
           "course"."name" AS "name",
           "teacher"."name" AS "teacherName",
           "teacher"."surname" AS "teacherSurname"
    FROM "course"
    JOIN "course_teacher"
    ON "course"."id" = "course_teacher"."course_id"
    JOIN "teacher"
    ON "teacher"."id" = "course_teacher"."teacher_id"
    JOIN "student_course"
    ON "course_teacher"."id" = "student_course"."course_teacher_id"
    WHERE "student_course"."student_id" = get_person_id('${studentId}');
`;

export const getAllMarksQuery = (studentId: string) => `
    WITH "student_grade" ("student_id", "grade_id") AS (
        SELECT "student"."id" AS "student_id", "student"."grade_id" AS "grade_id"
        FROM "student"
        WHERE
            "student"."id" = '${studentId}'
    )
    SELECT "discipline"."id" AS "disciplineId",
           "discipline"."name" AS "disciplineName",
           STRING_AGG(CAST("mark"."mark_value" AS varchar(1)), ', ') AS "marks",
           AVG("mark"."mark_value") AS "averageMark",
           "teacher"."name" AS "teacherName",
           "teacher"."surname" AS "teacherSurname"
    FROM "discipline"
    JOIN "teacher_discipline"
    ON "teacher_discipline"."discipline_id" = "discipline"."id"
    JOIN "teacher"
    ON "teacher"."id" = "teacher_discipline"."teacher_id"
    JOIN "lesson"
    ON "lesson"."teacher_discipline_id" = "teacher_discipline"."id"
    JOIN "student_grade"
    ON "student_grade"."grade_id" = "lesson"."grade_id"
    JOIN "mark"
    ON "mark"."lesson_id" = "lesson"."id" AND "mark"."student_id" = "student_grade"."student_id"
    GROUP BY "disciplineId", "disciplineName", "teacherName", "teacherSurname";
`;

export const getMarksWithDatesQuery = (
    studentId: string,
    disciplineId: string
) => `
    WITH "student_grade" ("student_id", "grade_id") AS (
        SELECT "student"."id" AS "student_id", "student"."grade_id" AS "grade_id"
        FROM "student"
        WHERE
            "student"."id" = '${studentId}'
    )
    SELECT "discipline"."name",
           STRING_AGG(CAST("mark"."mark_value" AS varchar(1)), ', ') AS "marks",
           STRING_AGG(TO_CHAR("lesson"."date_time", 'YYYY-MM-DD HH24:00'), ', ') AS "dates",
           "teacher"."name" AS "teacherName",
           "teacher"."surname" AS "teacherSurname"
    FROM "discipline"
    JOIN "teacher_discipline"
    ON "teacher_discipline"."discipline_id" = "discipline"."id"
    JOIN "teacher"
    ON "teacher"."id" = "teacher_discipline"."teacher_id"
    JOIN "lesson"
    ON "lesson"."teacher_discipline_id" = "teacher_discipline"."id"
    JOIN "student_grade"
    ON "student_grade"."grade_id" = "lesson"."grade_id"
    JOIN "mark"
    ON "mark"."lesson_id" = "lesson"."id" AND "mark"."student_id" = "student_grade"."student_id"
    WHERE "discipline"."id" = '${disciplineId}'
    GROUP BY "discipline"."name", "teacher"."name", "teacher"."surname";
`;

export const getMatesQuery = (studentId: string, gradeId: string) => `
    SELECT "student"."name" AS "name",
           "student"."surname" AS "surname",
           "student"."birthday_date" AS "birthdayDate"
    FROM "student"
    JOIN "grade"
    ON "student"."grade_id" = "grade"."id"
    WHERE "student"."id" != '${studentId}' AND
          "grade"."id" = '${gradeId}' AND
          "student"."expulsion_date" IS NULL
`;

export const getAllStudentsQuery = () => `
    SELECT "student"."id" AS "id",
           "student"."name" AS "name",
           "student"."surname" AS "surname",
           "student"."birthday_date" AS "birthdayDate",
           "grade"."id" AS "gradeId",
           "grade"."number" AS "gradeNumber",
           "grade"."letter" AS "gradeLetter",
           COALESCE(AVG("mark"."mark_value"), 0) AS "averageMark"
    FROM "student"
    LEFT JOIN "mark"
    ON "mark"."student_id" = "student"."id"
    JOIN "grade"
    ON "grade"."id" = "student"."grade_id"
    WHERE "student"."expulsion_date" IS NULL
    GROUP BY "student"."id",
             "student"."name",
             "student"."surname",
             "student"."birthday_date",
             "grade"."id",
             "grade"."number",
             "grade"."letter";
`;

export const addStudentQuery = (name, surname, birthday, gradeId) => `
    INSERT INTO "student" ("id", "name", "surname", "birthday_date", "grade_id", "enrollment_date")
    VALUES (gen_random_uuid(), '${name}', '${surname}', '${birthday}', '${gradeId}', CURRENT_DATE)
    RETURNING "id";
`;

export const addRegTokenQuery = (studentId) => `
    INSERT INTO "registration_token"
    VALUES (gen_random_uuid(), '${uuid().substring(
        0,
        8
    )}', '${studentId}', 'Ученик', FALSE)
    RETURNING "token";
`;

export const updateStudentQuery = (
    id: string,
    name: string,
    surname: string,
    birthday: string,
    gradeId: string
) => `
    UPDATE "student"
    SET "name" = '${name}',
        "surname" = '${surname}',
        "birthday_date" = '${birthday}',
        "grade_id" = '${gradeId}'
    WHERE "student"."id" = '${id}'
`;

export const deleteStudentQuery = (
    id: string
) => `
    UPDATE "student"
    SET "expulsion_date" = CURRENT_DATE
    WHERE "student"."id" = '${id}'
`;
