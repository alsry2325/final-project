// import {jwtDecode} from "jwt-decode";
//
// const BEARER = 'Bearer ';

export const saveToken = (headers) => {
    localStorage.setItem("access-token", headers['access-token']);    //키,값 저장
    localStorage.setItem("refresh-token", headers['refresh-token']);
}

// export const removeToken = () => {
//     localStorage.removeItem("access-token");
//     localStorage.removeItem("refresh-token");
// }
//
// const getAccessToken = () => window.localStorage.getItem('access-token');
// const getRefreshToken = () => window.localStorage.getItem('refresh-token');
//
// const getDecodeAccessToken = () => {
//     return getAccessToken() && jwtDecode(getAccessToken());
// }
// const getDecodeRefreshToken = () => {
//     return getRefreshToken() && jwtDecode(getRefreshToken());
// }
//
// export const getAccessTokenHeader = () => BEARER + getAccessToken();
// export const getRefreshTokenHeader = () => BEARER + getRefreshToken();
//
// export const isLogin = () => {
//     return getAccessToken() && getRefreshToken() && (Date.now() < getDecodeRefreshToken().exp * 1000);
// }
//
// export const isAdmin = () => {
//     return isLogin() && (getDecodeAccessToken().memberRole === 'ROLE_ADMIN');
// }