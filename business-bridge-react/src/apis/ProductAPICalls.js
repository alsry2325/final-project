import {authRequest, request} from "./Api";

import { getProducts} from "../modules/ProductModule";



// 상품목록 조회(사원)

export const callProductListAPI = ({currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/products?page=${currentPage}`);


        console.log('callProductListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getProducts(result));
        }
    }
};