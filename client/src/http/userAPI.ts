import { $host, $authHost } from ".";

export const registration = async (
    username: string,
    password: string,
    registrationToken: string
) => {
    const response = await $host.post("api/user/registration", {
        username,
        password,
        registrationToken,
    });

    return response;
};

export const login = async (username: string, password: string) => {
    const response = await $host.post("api/user/login", {
        username,
        password,
    });

    return response;
};

export const auth = async (token: string) => {
    const response = await $authHost.get("api/user/auth");

    return response;
};

export const getUserInfo = async (userId: string) => {
    const response = await $authHost.get(`api/user/getInfo`);

    return response;
}

export const getPubications = async () => {
    const response = await $authHost.get(`api/publications/getAll`);

    return response.data;
}
