
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const LOGIN_SUCCESS = 'employee/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'employee/LOGIN_FAILURE';
const GET_MYPAGE = 'employee/GET_MY_PAGE';


/* 액션 함수 */
export const { employee : {  loginSuccess, loginFailure, getMyPage } } = createActions({

    [LOGIN_SUCCESS] : () => ({ loginSuccess : true }),
    [LOGIN_FAILURE] : () => ({ loginSuccess : false }),
    [GET_MYPAGE]: (result) => ({ myPageInfo: result.data }),
});

/* 리듀서 함수 */
const memberReducer = handleActions({
    [LOGIN_SUCCESS] : (state, { payload }) => payload,
    [LOGIN_FAILURE] : (state, { payload }) => payload,
    [GET_MYPAGE] : (state, { payload }) => payload,
}, initialState);

export default memberReducer;












