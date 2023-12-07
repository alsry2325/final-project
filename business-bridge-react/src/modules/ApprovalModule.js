import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */         // 어떤 동작이 일어나는지 구분
const GET_RECEIVE_APPS = 'approval/GET_RECEIVE_APPS';
const GET_RECEIVE_APPS_BY_STATUS = 'approval/GET_RECEIVE_APPS_BY_STATUS';

/* 액션 함수 */         // 액션 객체를 만들어서 반환
export const {approval :
    {getReceiveApps, getReceiveAppsByStatus}}
    = createActions({
    [GET_RECEIVE_APPS] : result => ({ receiveAllApprovals : result.data}),
    [GET_RECEIVE_APPS_BY_STATUS] : result => ({receiveApprovalsBy : result.data})
})

/* 리듀서 */           // 액션을 받아서 처리할 때 어떻게 처리할지
const approvalReducer = handleActions({
    [GET_RECEIVE_APPS] : (state, {payload}) => payload,
    [GET_RECEIVE_APPS_BY_STATUS] : ( state, {payload} ) => payload,
}, initialState);

export default approvalReducer;