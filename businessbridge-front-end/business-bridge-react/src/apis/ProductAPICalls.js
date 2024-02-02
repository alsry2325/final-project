import {authRequest, request} from "./Api";

import {getAdminProducts, getProducts, postSuccess} from "../modules/ProductModule";
import {toast} from "react-toastify";



// 상품목록 조회(관리자)

export const callAdminProductListAPI = ({currentPage = 1, productState }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/products/management/productState/${productState}?page=${currentPage}`);


        console.log('callAdminProductListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getAdminProducts(result));
        }
    }
};

//해당 카테고리 상품

export const callProductCategoryListAPI = ({ productCategory, currentPage = 1 }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/api/v1/products/categories/${productCategory}?page=${currentPage}`);


        console.log('callProductCategoryListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getProducts(result));
        }
    }
};


//상품등록 (관리자 )

export const callProductRegistAPI = ({registRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post(
            '/api/v1/products/regist',
            registRequest
        )

        console.log('callProductRegist result : ', result);

        if(result.status === 201) {
            dispatch(postSuccess());
             toast.info("상품 등록이 완료되었습니다.");



        }
    }
};

// 상품목록 조회(사원 )


export const callProductListAPI = ({ currentPage = 1 }) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.get(`/api/v1/products/employee?page=${currentPage}`);

            console.log('callProductListAPI result : ', result);

            if (result && result.status === 200) {
                dispatch(getProducts(result));
            }
        } catch (error) {
            // 에러 핸들링을 추가
            console.error('Error in callProductListAPI:', error);
        }
    };
};

