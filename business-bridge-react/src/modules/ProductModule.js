/*초기값*/
import {createActions, handleActions} from "redux-actions";

const initialState = {};


/*액션타입*/

//상품 목록요청
const GET_PRODUCTS = 'product/GET_PRODUCTS';



/*액션함수 */

export const {product : {getProducts} } = createActions({

   [GET_PRODUCTS] : result => ({ products : result.data})
});




/*리튜서*/

const productReducer = handleActions({

    [GET_PRODUCTS] : ( state, {payload}) => payload
}, initialState);



export  default productReducer;