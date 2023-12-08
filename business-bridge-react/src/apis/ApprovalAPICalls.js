import async from "async";
import {authRequest, request} from "./Api";
import {
    getDraftApps,
    getDraftAppsByStatus,
    getReceiveApps,
    getReceiveAppsByStatus,
    getUpcomingApps
} from "../modules/ApprovalModule";

/* 업무 기안서 등록 */
export const callBusinessDraftRegistAPI = () => {

}

/* 받은 결재 목록 조회 - 전체 */
export const callReceiveApprovalsListAPI = ({currentPage}) => {

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
export const callReceiveAppsByStatusAPI = ({currentPage, approvalStatus}) => {

    console.log("요청 URL : " + `/approval/receive-approvals/${approvalStatus}?page=${currentPage}`);
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

/* 받을 결재 목록 조회 - 전체 */
export const callUpcomingApprovalsListAPI = ({currentPage}) => {

    return async (dispatch, getStatus) => {

        const result
            = await authRequest.get( `/approval/upcoming-approvals?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('받을 결재 목록 조회 결과 : ', result);

        if(result?.status === 200) {
            dispatch(getUpcomingApps(result));
        }
    }
}

/* 기안한 문서 목록 조회 - 전체 */
export const callDraftAppsAPI = ({currentPage}) => {

    console.log("요청 URL : " + `/approval/draft-docs/all?page=${currentPage}`);
    return async (dispatch, getState) => {
        const result
            =await authRequest.get(`/approval/draft-docs/all?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => { console.log(e); });

        console.log('기안한 문서 목록 조회 결과 : ', result);

        if(result?.status === 200) {
            dispatch(getDraftApps(result));
        }
    }
}

/* 기안한 문서 목록 조회 - 상태별 */
export const callDraftAppsByStatusAPI = ({currentPage, docStatus}) => {

    console.log("요청 URL : " + `/approval/draft-docs/${docStatus}?page=${currentPage}`);
    return async (dispatch, getState) => {
        const result
            =await authRequest.get(`/approval/draft-docs/${docStatus}?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => { console.log(e); });

        console.log('기안한 문서 목록 상태별 조회 결과 : ', result);

        if(result?.status === 200) {
            dispatch(getDraftAppsByStatus(result));
        }
    }
}