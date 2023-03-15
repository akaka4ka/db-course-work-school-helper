import { $authHost } from ".";

export const getAllStudents = async (studentId: string, gradeId: string) => {
    const response = await $authHost.get("api/student/getAll");

    return response;
};

export const addStudent = async (
    name: string,
    surname: string,
    birthday: string,
    gradeId: string
) => {
    const response = await $authHost.post("api/student/add", {
        name,
        surname,
        birthday,
        gradeId,
    });

    return response.data.regToken;
};

export const updateStudent = async (
    id: string,
    name: string,
    surname: string,
    birthday: string,
    gradeId: string
) => {
    const response = await $authHost.post("api/student/update", {
        id,
        name,
        surname,
        birthday,
        gradeId,
    });

    return response;
};

export const deleteStudent = async (id: string) => {
    const response = await $authHost.post("api/student/del", {
        id,
    });

    return response;
};

export const getTeachers = async () => {
    const response = await $authHost.get("api/teachers/getAll");

    return response.data;
};

export const getHTeachers = async () => {
    const response = await $authHost.get("api/teachers/getAllH");

    return response.data;
};

export const getAllDisciplines = async () => {
    const response = await $authHost.get("api/disciplines/getAll");

    return response.data;
};

export const addHTeacher = async (
    name: string,
    surname: string,
    birthday: string
) => {
    const response = await $authHost.post("api/teachers/addHTeacher", {
        name,
        surname,
        birthday,
    });

    return response.data.regToken;
};

export const addTeacher = async (
    name: string,
    surname: string,
    birthday: string,
    disciplines: string[]
) => {
    const response = await $authHost.post("api/teachers/addTeacher", {
        name,
        surname,
        birthday,
        disciplines,
    });

    return response.data.regToken;
};

export const getTeacherDisciplines = async (teacherId: string) => {
    const response = await $authHost.post("api/teachers/getDisciplines", {
        teacherId,
    });

    return response.data;
};

export const updateTeacherInfo = async (
    teacherId: string,
    name: string,
    surname: string,
    birthday: string
) => {
    const response = await $authHost.post("api/teachers/updateTeacher", {
        teacherId,
        name,
        surname,
        birthday,
    });

    return response;
};

export const updateTeacherDisc = async (
    teacherId: string,
    disc: string[]
) => {
    const response = await $authHost.post("api/teachers/updateTeacherDisc", {
        teacherId,
        disc
    });   

    return response;
};
