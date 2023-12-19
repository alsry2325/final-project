
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const LOGIN_SUCCESS = 'employee/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'employee/LOGIN_FAILURE';
const GET_LOGIN_EMPLOYEE = 'employee/GET_LOGIN_EMPLOYEE';
const GET_MYPAGE = 'employee/GET_MY_PAGE';
const GET_SERACH_EMPLOYEES = 'employee/GET_SERACH_EMPLOYEES';
const GET_EMPLOYEES = 'employee/GET_EMPLOYEES';
const GET_EMPLOYEE = 'employee/GET_EMPLOYEE'
const POST_EMPLOYEE_SUCCESS = 'employee/POST_EMPLOYEE_SUCCESS';
const POST_EMPLOYEE_FAILURE = 'employee/POST_EMPLOYEE_FAILURE';
const PUT_EMPLOYEE_SUCCESS = 'employee/PUT_EMPLOYEE_SUCCESS';

/* 액션 함수 */
export const { employee : {  loginSuccess, loginFailure, getMyPage,getEmployees, postEmployeeSuccess,postEmployeeFailure,getEmployee,putEmployeeSuccess,getSerachEmployees,getLoginEmployee } } = createActions({

    [LOGIN_SUCCESS] : () => ({ loginSuccess : true }),
    [LOGIN_FAILURE] : () => ({ loginSuccess : false }),
    [GET_MYPAGE]: (result) => ({ myPageInfo: result.data }),
    [GET_LOGIN_EMPLOYEE]: (result) => ({ myPageInfo: result.data }),
    [GET_SERACH_EMPLOYEES] :(result) =>({ employeesListInfo:result.data }),
    [GET_EMPLOYEES]:(result)=>({ employeesListInfo: result.data }),
    [GET_EMPLOYEE]:(result) =>({employeeInfo: result.data}),
    [POST_EMPLOYEE_SUCCESS]: ()=>({ postEmployeeSuccess : true }),
    [POST_EMPLOYEE_FAILURE]: () =>({ postEmployeeSuccess : false}),
    [PUT_EMPLOYEE_SUCCESS]: () => ({putEmployeeSuccess : true}),

});

/* 리듀서 함수 */
const memberReducer = handleActions({
    [LOGIN_SUCCESS] : (state, { payload }) => payload,
    [LOGIN_FAILURE] : (state, { payload }) => payload,
    [GET_MYPAGE] : (state, { payload }) => ({...state, ...payload}),
    [GET_LOGIN_EMPLOYEE] : (state, { payload }) => ({...state, ...payload}),
    [GET_SERACH_EMPLOYEES] : (state,{ payload }) => payload,
    [GET_EMPLOYEES] : (state,{ payload }) => ({...state, ...payload}),  //복사해서 이어감
    [GET_EMPLOYEE] : (state,{ payload }) => ({...state, ...payload}),
    [POST_EMPLOYEE_SUCCESS] : (state, { payload }) => payload,
    [POST_EMPLOYEE_FAILURE] : (state,{ payload }) => payload,
    [PUT_EMPLOYEE_SUCCESS] : (state,{ payload }) => payload,
}, initialState);

export default memberReducer;












