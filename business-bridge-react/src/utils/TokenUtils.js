import {jwtDecode} from "jwt-decode";

const BEARER = 'Bearer ';


export const saveToken = (headers) => {
    localStorage.setItem("access-token", headers['access-token']);
    localStorage.setItem("refresh-token", headers['refresh-token']);
}

export const removeToken = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
}

const getAccessToken = () => window.localStorage.getItem('access-token');

const getRefreshToken = () => window.localStorage.getItem('refresh-token');

const getDecodeAccessToken = () => {
    return getAccessToken() && jwtDecode(getAccessToken());
}

const getDecodeRefreshToken = () => {
    return getRefreshToken() && jwtDecode(getRefreshToken());
}

export const getAccessTokenHeader = () => BEARER + getAccessToken();

export const getRefreshTokenHeader = () => BEARER + getRefreshToken();

/* 로그인 됐는지 확인 */
export const isLogin = () => {

    return getAccessToken() && getRefreshToken() &&
        (Date.now() < getDecodeRefreshToken().exp * 1000);
}

/* 관리자인지 확인 */
export const isAdmin = () => {
    return isLogin() && (getDecodeAccessToken().memberRole === 'ROLE_ADMIN');
}