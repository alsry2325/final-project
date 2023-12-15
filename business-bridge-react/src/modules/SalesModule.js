import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 */
const GET_SALES_LIST    = 'sales/GET_SALES_LIST';
const GET_SALES         = 'sales/GET_SALES';
const POST_SUCCESS      = 'sales/POST_SUCCESS';
const PUT_SUCCESS       = 'sales/PUT_SUCCESS';
const DELETE_SUCCESS    = 'sales/DELETE_SUCCESS';
const GET_SALES_PRODUCT_LIST    = 'sales/GET_SALES_PRODUCT_LIST';
const GET_SALES_STATISTICS    = 'sales/GET_SALES_STATISTICS';

/* 액션 함수 */
export const { sales : { getSalesList, getSales, postSuccess, putSuccess, deleteSuccess, getSalesProductList, getSalesStatistics } } = createActions({
    [GET_SALES_LIST] : result => ({ salesList : result.data }),
    [GET_SALES] : result => ({ sales : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [PUT_SUCCESS] : () => ({ putSuccess : true }),
    [DELETE_SUCCESS] : () => ({ deleteSuccess : true }),
    [GET_SALES_PRODUCT_LIST] : result => ({ salesProductList : result.data }),
    [GET_SALES_STATISTICS] : result => ({ salesStatistics : result.data }),

});

/* 리듀서 */
const salesReducer = handleActions({
    [GET_SALES_LIST] : (state, { payload }) => payload,
    [GET_SALES] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [PUT_SUCCESS] : (state, { payload }) => payload,
    [DELETE_SUCCESS] : (state, { payload }) => payload,
    [GET_SALES_PRODUCT_LIST] : (state, { payload }) => ({
        ...state,
        ...payload
    }),
    [GET_SALES_STATISTICS] : (state, { payload }) => payload,
}, initialState);

export default salesReducer;