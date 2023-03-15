import User from "../../models/User.js";

export const findUserByNameQuery = (username: string): string => `
    SELECT *
    FROM "user"
    WHERE "user"."username" = '${username}'
`;

export const findUserByTokenQuery = (token: string): string => `
    SELECT "user"."username"
    FROM "user"
    JOIN "registration_token"
    ON "registration_token"."person_id" = "user"."person_id"
    WHERE "registration_token"."token" = '${token}'
`;

export const findRegistrationTokenQuery = (token: string): string => `
    SELECT "registration_token"."token"
    FROM "registration_token"
    WHERE
        "registration_token"."token" = '${token}' AND
        "registration_token"."is_used" = FALSE
`;

export const registerUserQuery = (
    username: string,
    hashedPassword: string,
    token: string
): string => `
    INSERT INTO "user"
    SELECT
        gen_random_uuid(),
        '${username}',
        '${hashedPassword}',
        "registration_token"."role_id",
        "registration_token"."person_id"
    FROM "registration_token"
    WHERE "registration_token"."token" = '${token}'
    RETURNING *
`;

export const getStudentInfo = (userId: string) => `
    SELECT "student"."id" AS "studentId",
           "student"."name", 
           "student"."surname",
           "student"."birthday_date",
           "grade"."id" AS "gradeId",
           "grade"."number",
           "grade"."letter"
    FROM "student"
    JOIN "grade"
    ON "student"."grade_id" = "grade"."id"
    WHERE "student"."id" = get_person_id('${userId}');
`;

export const getPrincipalInfo = (userId: string) => `
    SELECT "principal"."id" AS "studentId",
           "principal"."name", 
           "principal"."surname",
           "principal"."birthday_date"
    FROM "principal"
    WHERE "principal"."id" = get_person_id('${userId}');
`;

export const getHTeacherInfo = (userId: string) => `
    SELECT "head_teacher"."id" AS "studentId",
           "head_teacher"."name", 
           "head_teacher"."surname",
           "head_teacher"."birthday_date"
    FROM "head_teacher"
    WHERE "head_teacher"."id" = get_person_id('${userId}');
`;
