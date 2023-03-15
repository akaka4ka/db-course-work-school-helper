import { $authHost } from ".";
import { UserStore } from "../classes/UserStore";

export const getStudentCourses = async () => {
    const response = await $authHost.get("api/student/courses/own");

    return response;
};

export const getAvailableCourses = async (studentId: string) => {
    const response = await $authHost.get("api/courses/available", {
        params: {
            studentId: studentId,
        },
    });

    return response;
};

export const courseKickStudent = async (
    studentId: string,
    courseId: string
) => {
    const response = await $authHost.post("api/courses/kickStudent", {
        studentId,
        courseId,
    });

    return response;
};

export const courseJoinStudent = async (
    studentId: string,
    courseTeacherId: string
) => {
    const response = await $authHost.post("api/courses/joinStudent", {
        studentId,
        courseTeacherId,
    });

    return response;
};

export const getAllMarks = async (studentId: string) => {
    const response = await $authHost.get("api/student/marks", {
        params: {
            studentId: studentId,
        },
    });

    return response;
};

export const getMarksWithDate = async (
    studentId: string,
    disciplineId: string
) => {
    const response = await $authHost.get("api/student/marksByDiscipline", {
        params: {
            studentId: studentId,
            disciplineId: disciplineId,
        },
    });

    return response;
};

export const getMates = async (studentId: string, gradeId: string) => {
    const response = await $authHost.get("api/student/getMates", {
        params: {
            studentId: studentId,
            gradeId: gradeId,
        },
    });

    return response;
};

export const getLessons = async (gradeId: string) => {
    const response = await $authHost.get("api/lessons/grade", {
        params: {
            gradeId: gradeId,
        },
    });

    return response;
};
