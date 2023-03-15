import { UserStore } from "./../UserStore";
import { getUserInfo } from "./../../http/userAPI";
import { auth, login, registration } from "../../http/userAPI";
import { ResponseStatus } from "../../utils/common/Constants";
import jwt_decode from "jwt-decode";

export const localStorageJWT: string = "SHJWT";

class AuthController {
    public static shouldUserLogin: boolean = false;

    private static _isAuthorized: boolean = false;
    private static _isStoredJWTExpired: boolean = false;

    private static _userId: string;
    private static _userRole: string;

    static get userId(): string {
        return this._userId;
    }

    static get userRole(): string {
        return this._userRole;
    }

    static get isAuthorized(): boolean {
        return this._isAuthorized;
    }

    static setUserInfo(id: string, role: string): void {
        this._userId = id;
        this._userRole = role;
    }

    static async authWithStoredJWT(): Promise<void> {
        if (this._isStoredJWTExpired) {
            this.shouldUserLogin = true;
            return;
        }

        const token: string | null = localStorage.getItem(localStorageJWT);
        if (!token) {
            this.shouldUserLogin = true;
            return;
        }

        const response = await auth(token);

        if (response.status === ResponseStatus.OK) {
            const decoded: any = jwt_decode(token);

            this.setUserInfo(decoded.id, decoded.role);

            const userInfoResponse = await getUserInfo(decoded.id);

            if (userInfoResponse.status === ResponseStatus.OK) {
                const user: any = JSON.parse(
                    JSON.stringify(userInfoResponse.data.userInfo)
                );

                if (decoded.role === "Ученик") {
                    UserStore.setUserInfo(
                        user.id,
                        user.name,
                        user.surname,
                        user.birthdayDate,
                        {
                            id: user.grade.id,
                            number: user.grade.number,
                            letter: user.grade.letter,
                        }
                    );
                }

                if (decoded.role === "Директор") {
                    UserStore.setUserInfo(
                        user.id,
                        user.name,
                        user.surname,
                        user.birthdayDate,
                        {
                            id: "0",
                            number: 0,
                            letter: "0",
                        }
                    );
                }

                if (decoded.role === "Завуч") {
                    UserStore.setUserInfo(
                        user.id,
                        user.name,
                        user.surname,
                        user.birthdayDate,
                        {
                            id: "0",
                            number: 0,
                            letter: "0",
                        }
                    );
                }
            }

            this.shouldUserLogin = false;
            this._isStoredJWTExpired = false;
            this._isAuthorized = true;
            localStorage.setItem(localStorageJWT, response.data.token);
        }

        return;
    }

    static async login(username: string, password: string): Promise<void> {
        const response = await login(username, password);

        if (response.status === ResponseStatus.OK) {
            const decoded: any = jwt_decode(response.data.token);
            this.setUserInfo(decoded.id, decoded.role);
            this.shouldUserLogin = false;
            this._isStoredJWTExpired = false;
            this._isAuthorized = true;
            localStorage.setItem(localStorageJWT, response.data.token);
        }

        return;
    }

    static async registration(
        username: string,
        password: string,
        registrationToken: string
    ): Promise<void> {
        const response = await registration(
            username,
            password,
            registrationToken
        );

        if (response.status === ResponseStatus.OK) {
            const decoded: any = jwt_decode(response.data.token);
            this.setUserInfo(decoded.id, decoded.role);
            this.shouldUserLogin = false;
            this._isStoredJWTExpired = false;
            this._isAuthorized = true;
            localStorage.setItem(localStorageJWT, response.data.token);
        }

        return;
    }

    static logOut() {
        UserStore.dropUser();

        localStorage.removeItem(localStorageJWT);
    }
}

export default AuthController;
