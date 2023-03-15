import { $authHost } from '.';

export const getCourses = async () => {
    const response = await $authHost.get("api/courses");

    return response;
};
