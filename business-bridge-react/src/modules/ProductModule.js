/*초기값*/
import {createActions, handleActions} from "redux-actions";

const initialState = {};


/*액션타입*/

//상품 목록요청
const GET_ADMIN_PRODUCTS = 'product/GET_ADMIN_PRODUCTS';
const POST_SUCCESS = 'product/POST_SUCCESS';
const GET_PRODUCTS = 'product/GET_PRODUCTS';




/*액션함수 */

export const {product : {getAdminProducts, postSuccess, getProducts} } = createActions({

   [GET_ADMIN_PRODUCTS] : result => ({ adminProducts : result.data}),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [GET_PRODUCTS] : result => ({ products : result.data}),

});




/*리듀서*/

const productReducer = handleActions({

    [GET_ADMIN_PRODUCTS] : ( state, {payload}) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [GET_PRODUCTS] : ( state, {payload}) => payload,
}, initialState);



export  default productReducer;