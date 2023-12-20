import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_ACCOUNT_LIST    = 'account/GET_ACCOUNT_LIST';
const GET_ACCOUNT         = 'account/GET_ACCOUNT';
const POST_SUCCESS      = 'account/POST_SUCCESS';
const PUT_SUCCESS       = 'account/PUT_SUCCESS';
const DELETE_SUCCESS    = 'account/DELETE_SUCCESS';
/* 액션 함수 */
export const { account : { getAccountList, getAccount, postSuccess, putSuccess, deleteSuccess} } = createActions({
    [GET_ACCOUNT_LIST] : result => ({ accountList : result.data }),
    [GET_ACCOUNT] : result => ({ account : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [PUT_SUCCESS] : () => ({ putSuccess : true }),
    [DELETE_SUCCESS] : () => ({ deleteSuccess : true }),

});

/* 리듀서 */
const accountReducer = handleActions({
    [GET_ACCOUNT_LIST] : (state, { payload }) => payload,
    [GET_ACCOUNT] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [PUT_SUCCESS] : (state, { payload }) => payload,
    [DELETE_SUCCESS] : (state, { payload }) => payload,
}, initialState);

export default accountReducer;