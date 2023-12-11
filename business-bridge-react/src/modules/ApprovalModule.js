import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */         // 어떤 동작이 일어나는지 구분
const GET_RECEIVE_APPS = 'approval/GET_RECEIVE_APPS';
const GET_RECEIVE_APPS_BY_STATUS = 'approval/GET_RECEIVE_APPS_BY_STATUS';
const GET_UPCOMING_APPS = 'approval/GET_UPCOMING_APPS';
const GET_DRAFT_APPS = 'approval/GET_DRAFT_APPS';
const GET_DRAFT_APPS_BY_STATUS = 'approval/GET_DRAFT_APPS_BY_STATUS';
const GET_DRAFT_COLLECT = 'approval/GET_DRAFT_COLLECT';
const GET_TEMP_STORAGE = 'approval/GET_TEMP_STORAGE';
const GET_APPROVE_APPS = 'approval/GET_APPROVE_APPS';
const GET_APPROVE_APPS_BY_STATUS = 'approval/GET_APPROVE_APPS_BY_STATUS';

const GET_BUSINESS_DRAFT_DETAIL = 'approval/GET_BUSINESS_DRAFT_DETAIL';
const GET_EXPENSE_REPORT_DETAIL = 'approval/GET_EXPENSE_REPORT_DETAIL';
const GET_APP_EMPLOYEES = 'approval/GET_APP_EMPLOYEES';


/* 액션 함수 */         // 액션 객체를 만들어서 반환
export const {approval :
    {getReceiveApps, getReceiveAppsByStatus, getUpcomingApps, getDraftApps, getDraftAppsByStatus,
    getDraftCollect, getTempStorage, getApproveApps, getApproveAppsByStatus,
    getBusinessDraftDetail, getExpenseReportDetail, getAppEmployees}}
    = createActions({
    [GET_RECEIVE_APPS] : result => ({ receiveAllApprovals : result.data}),
    [GET_RECEIVE_APPS_BY_STATUS] : result => ({receiveApprovalsBy : result.data}),
    [GET_UPCOMING_APPS] : result => ({upcomingApps : result.data}),
    [GET_DRAFT_APPS] : result => ({draftApps : result.data}),
    [GET_DRAFT_APPS_BY_STATUS] : result => ({draftAppsBy : result.data}),
    [GET_DRAFT_COLLECT] : result => ({draftCollect : result.data}),
    [GET_TEMP_STORAGE] : result => ({tempStorages : result.data}),
    [GET_APPROVE_APPS] : result => ({approveApps : result.data}),
    [GET_APPROVE_APPS_BY_STATUS] : result => ({approveAppsBy : result.data}),

    [GET_BUSINESS_DRAFT_DETAIL] : result => ({businessDraft : result.data}),
    [GET_EXPENSE_REPORT_DETAIL] : result => ({expenseReport : result.data}),
    [GET_APP_EMPLOYEES] : result => ({allEmplys : result.data}),
})

/* 리듀서 */           // 액션을 받아서 처리할 때 어떻게 처리할지
const approvalReducer = handleActions({
    [GET_RECEIVE_APPS] : (state, {payload}) => payload,
    [GET_RECEIVE_APPS_BY_STATUS] : ( state, {payload} ) => payload,
    [GET_UPCOMING_APPS] : (state, {payload}) => payload,
    [GET_DRAFT_APPS] : (state, {payload}) => payload,
    [GET_DRAFT_APPS_BY_STATUS] : (state, {payload}) => payload,
    [GET_DRAFT_COLLECT] : (state, {payload}) => payload,
    [GET_TEMP_STORAGE] : (state, {payload}) => payload,
    [GET_APPROVE_APPS] : (state, {payload}) => payload,
    [GET_APPROVE_APPS_BY_STATUS] : (state, {payload}) => payload,
    [GET_BUSINESS_DRAFT_DETAIL] : (state, {payload}) => payload,
    [GET_EXPENSE_REPORT_DETAIL] : (state, {payload}) => payload,
    [GET_APP_EMPLOYEES] : (state, {payload}) => payload
}, initialState);

export default approvalReducer;