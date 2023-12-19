import {authRequest, request} from "./Api";
import {saveToken} from "../utils/TokenUtils";
import {
    getEmployee,
    getEmployees, getLoginEmployee,
    getMyPage,
    getSerachEmployees,
    loginFailure,
    loginSuccess,
    postEmployeeSuccess, putEmployeeSuccess
} from "../modules/EmployeeModule";
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

export const callLoginEmployeeAPI = () => {

    return async (dispatch, getState) => {

        try {
            const result = await authRequest.get("/emp/employee/mypage");
            // console.log('callMemberAPI result : ', result);
            if (result.status === 200) {
                dispatch(getLoginEmployee(result));
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
            console.log('callSearchEmployeeListAPI result : ', result);
            if (result.status === 200) {
                dispatch(getSerachEmployees(result));
            }
        } catch (error) {
            console.error('Error in callSearchEmployeeListAPI:', error);
        }
    }
}
/* 사원목록 */
export const callEmployeeListAPI = ({currentPage = 1 }) => {

    return async (dispatch) => {

        try {
            const result = await authRequest.get(`/emp/employee/employees?page=${currentPage}`);
            console.log('callEmployeeListAPI result : ', result);

            if (result.status === 200) {
                dispatch(getEmployees(result));
            }
        } catch (error) {
            console.error('Error in callEmployeeListAPI:', error);
        }
    }
}

/* 사원 조회 */
export const callEmloyeeinformationAPI = ({emplyCode}) =>{
    
    return async (dispatch) => {
        
        try {
            const result = await  authRequest.get(`/emp/employee/check-employe/${emplyCode}`)
            console.log('callEmloyeeinformationAPI result : ', result);

            if(result.status === 200){
                dispatch(getEmployee(result));
            }
        }catch (error) {

            }
    }
}

/* 사원등록 */
export  const  callEmployeeRegistAPI = ( {employeeRegistrationRequest} ) =>{

    return async (dispatch, getState) =>{

        try{
            const result = await authRequest.post( '/emp/employee/register-and-send-email',employeeRegistrationRequest);
            console.log('callEmployeeRegistAPI result : ', result);

            if(result.status === 201) {
                dispatch(postEmployeeSuccess());
                toast.info("회원 등록이 완료되었습니다.");
            }


        }catch (error) {
            toast.warning(error.response.data.message);
        }

    }
}

/* 사원수정 */
    export const callEmployeeModifyAPI = ({ emplyCode, updateData  }) => {

        return async (dispatch, getState) => {
            try {
                const result = await authRequest.put(`/emp/employee/employee-modify/${emplyCode}`, updateData);
                console.log('callEmployeeModifyAPI result : ', result);

                if(result.status === 201) {
                    dispatch(putEmployeeSuccess());
                    toast.info("상품 수정이 완료 되었습니다.");
                }
            }catch (error){
                toast.warning(error.response.data.message);
            }

        }
    }