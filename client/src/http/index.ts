import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { localStorageJWT } from "../classes/authorization/AuthController";

const $host: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const $authHost: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config: AxiosRequestConfig | any): AxiosRequestConfig => {
    config.headers.authorization = `Bearer ${localStorage.getItem(localStorageJWT)}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}
