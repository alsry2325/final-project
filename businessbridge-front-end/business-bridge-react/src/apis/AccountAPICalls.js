import {authRequest, request} from "./Api";
import {getAccountList
    , getAccount
    , postSuccess
    , putSuccess
    , deleteSuccess

} from "../modules/AccountModule";
import {toast} from "react-toastify";

//거래처 등록
export const callAccountRegistAPI = ({ registRequest }) => {
    console.log("거래처등록 보내기전의 값");
    console.log(registRequest);
    return async (dispatch, getState) => {

        const result = await authRequest.post(`/api/v1/account`
            , registRequest
            , {'Content-Type' : 'application/json'}
        ).catch(e => {
                console.log(e.response.status);
            }
        );

        console.log('callAccountRegistAPI result.status >>>>>>>>>>>>> '+result.status);
        if(result.status === 201) {
            dispatch(postSuccess());
            toast.info("거래처 등록이 완료 되었습니다.");
        }
    }
}

//거래처 상세조회
export const callAccountAPI = ({ accountCode }) => {

    console.log("callAccountAPI accountCode : "+accountCode);

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/account/${accountCode}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callAccountAPI result : ', result);
        if(result?.status === 200) {
            dispatch(getAccount(result));
        }
    }
}

//거래처 수정
export const callAccountModifyAPI = ({ accountCode, modifyRequest }) => {

    console.log('수정 번호');
    console.log(accountCode);
    console.log("수정 보내기전의 값");
    console.log(modifyRequest);

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/api/v1/account/${accountCode}`, modifyRequest);
        console.log('callAccountModifyAPI result : ', result);
        if(result.status === 201) {
            dispatch(putSuccess());
            toast.info("거래처 수정이 완료 되었습니다.");
        }
    }
};

//거래처 삭제
export const callAccountDeleteAPI = ({ accountCode}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/api/v1/account/${accountCode}`);

        console.log('callAccountDeleteAPI result : ', result);
        if(result.status === 201) {
            dispatch(deleteSuccess());
            toast.info("거래처 삭제가 완료 되었습니다.");
        }
    }
};

//거래처 목록
export const callAccountListAPI = ({departmentCode, currentPage = 1, schType, schText}) => {

    console.log("목록 조회하기전 받은 파라미터");
    console.log("요청 URL >>>>>>>>>>>> :" +`/api/v1/account/accountList/${departmentCode}?page=${currentPage}&schType=${schType}&schText=${schText}`);
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/api/v1/account/accountList/${departmentCode}?page=${currentPage}&schType=${schType}&schText=${schText}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });
        console.log('callAccountListAPI result : ', result);
        if(result?.status === 200) {
            dispatch(getAccountList(result));
        }
    }
};