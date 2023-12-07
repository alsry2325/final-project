import async from "async";
import {authRequest, request} from "./Api";
import {getReceiveApps, getReceiveAppsByStatus} from "../modules/ApprovalModule";

/* 업무 기안서 등록 */
export const callBusinessDraftRegistAPI = () => {

}

/* 받은 결재 목록 조회 - 전체 */
export const callReceiveApprovalsListAPI = ({currentPage = 1}) => {

    return async (dispatch, getStatus) => {

        const result
            = await authRequest.get( `/approval/receive-approvals/all?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('받은 결재 목록 조회 결과 : ', result);

        if(result?.status === 200) {
            dispatch(getReceiveApps(result));
        }
    }
}

/* 받은 결재 목록 조회 - 상태별 */
export const callReceivedAppsByStatusAPI = ({currentPage = 1, approvalStatus}) => {

    return async (dispatch, getState) => {
        const result
        =await authRequest.get(`/approval/receive-approvals/${approvalStatus}?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => { console.log(e); });

        console.log('받은 결재 목록 상태별 : ', result);

        if(result?.status === 200) {
            dispatch(getReceiveAppsByStatus(result));
        }
    }

}