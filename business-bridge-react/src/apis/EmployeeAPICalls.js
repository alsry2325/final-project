import {authRequest, request} from "./Api";
import {saveToken} from "../utils/TokenUtils";
import {getEmployees, getMyPage, getSearchEmployees, loginFailure, loginSuccess} from "../modules/EmployeeModule";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const callLoginAPI = ({loginRequest}) => {

    return async (dispatch, getState) => {

        const result = await request(
            'POST',
            '/emp/employee/login',
            {'Content-Type' : 'application/json'},
            JSON.stringify(loginRequest)   /* { "memberId":"","memberPassword":"" }*/
        );

        console.log('callLoginAPI result : ', result);

        if(result?.status === 200) {
            saveToken(result.headers);  //토큰 모아놓은 공간
            dispatch(loginSuccess());
        } else {
            dispatch(loginFailure());
            toast.warning('로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.');
        }

    }
}

export const callEmployeeAPI = () => {

    return async (dispatch, getState) => {

        try {
            const result = await authRequest.get("/emp/employee/mypage");
            // console.log('callMemberAPI result : ', result);
            if (result.status === 200) {
                dispatch(getMyPage(result));
            }
        } catch (error) {
            console.error('Error in callEmployeeAPI:', error);
        }
    }
}

/* 검색 사원목록*/
export const callSearchEmployeeListAPI = ({ currentPage = 1,currentEmplyName="",currentDartMentName="",currentPositionName=""}) => {

    return async (dispatch, getState) => {

        try {
            const result = await authRequest.get(`/emp/employee/employees/search?page=${currentPage}&emplyName=${currentEmplyName}&departmentName=${currentDartMentName}&positionName=${currentPositionName}`);
            console.log('callEmployeeListAPI result : ', result);
            if (result.status === 200) {
                dispatch(getEmployees(result));
            }
        } catch (error) {
            console.error('Error in callEmployeeListAPI:', error);
        }
    }
}
/* 사원목록 */
export const callEmployeeListAPI = ({currentPage =1 }) =>{

    return async (dispatch, getState) =>{

        const result = await authRequest.get( `/emp/employee/employees?page=${currentPage}`);
        console.log('callEmployeeListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getEmployees(result));
        }
    }
}


