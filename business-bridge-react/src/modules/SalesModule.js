import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_SALES_LIST     = 'sales/GET_SALES_LIST';
const GET_SALES         = 'sales/GET_SALES';
const POST_SUCCESS      = 'sales/POST_SUCCESS';

/* 액션 함수 */
export const { sales : { getSalesList, getSales, postSuccess } } = createActions({
    [GET_SALES_LIST] : result => ({ salesList : result.data }),
    [GET_SALES] : result => ({ sales : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
});

/* 리듀서 */
const salesReducer = handleActions({
    [GET_SALES_LIST] : (state, { payload }) => payload,
    [GET_SALES] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
}, initialState);

export default salesReducer;