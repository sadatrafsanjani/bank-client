export class LoginResponse {

    id: string;
    username: string;
    loginToken: string;
    refreshToken: string;
    roles: Array<number>;
    expiresAt: string;
    picture: [];
    pages: [];
}
