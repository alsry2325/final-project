import {authRequest, request} from "./Api";
import {getSalesList
    , getSales
    , postSuccess
    , putSuccess
    , deleteSuccess
    , getSalesProductList
    , getSalesStatistics

} from "../modules/SalesModule";
import {toast} from "react-toastify";

//영업 등록
export const callSalesRegistAPI = ({ registRequest }) => {
    console.log("영업등록 보내기전의 값");
    console.log(registRequest);
    return async (dispatch, getState) => {
        const result = await request('POST' , `/api/v1/sales`
            , {'Content-Type' : 'application/json'}
            , registRequest
        )

        console.log('callSalesRegistAPI result.status >>>>>>>>>>>>> '+result.status);
        if(result.status === 201) {
            dispatch(postSuccess());
            toast.info("영업 등록이 완료 되었습니다.");
        }
    }
}

//진행내역 등록
export const callProgressRegistAPI = ({ registRequest }) => {
    console.log("진행내역 보내기전의 값");
    console.log(registRequest);
    return async (dispatch, getState) => {
        const result = await request('POST' , `/api/v1/progress`
            , {'Content-Type' : 'application/json'}
            , registRequest
        )
        console.log('callProgressRegistAPI result.status >>>>>>>>>>>>> '+result.status);
        if(result.status === 201) {
            dispatch(postSuccess());
            toast.info("진행내역이 등록 되었습니다.");
        }
    }
}

//영업 상세조회
export const callSalesAPI = ({ salesCode }) => {

    return async (dispatch, getState) => {

        const result = await request('GET',`/api/v1/sales/${salesCode}`);
        console.log('callSalesAPI result : ', result);
        if(result.status === 200) {
            dispatch(getSales(result));
        }
    }
}

//영업 수정
export const callSalesModifyAPI = ({ salesCode, modifyRequest }) => {

    console.log("수정 보내기전의 값");
    console.log(modifyRequest);

    return async (dispatch, getState) => {

        const result = await request('PUT',`/api/v1/sales/${salesCode}`
            , {'Content-Type' : 'application/json'}
            , modifyRequest);

        console.log('callSalesModifyAPI result : ', result);
        if(result.status === 201) {
            dispatch(putSuccess());
            toast.info("영업 수정이 완료 되었습니다.");
        }
    }
};

//영업 삭제
export const callSalesDeleteAPI = ({ salesCode}) => {

    return async (dispatch, getState) => {

        const result = await request('DELETE',`/api/v1/sales/${salesCode}`
            , {'Content-Type' : 'application/json'}
        );

        console.log('callSalesDeleteAPI result : ', result);
        if(result.status === 201) {
            dispatch(deleteSuccess());
            toast.info("영업 삭제가 완료 되었습니다.");
        }
    }
};

//영업 목록
export const callSalesListAPI = ({salesStatus, currentPage = 1, schType, schText}) => {

    console.log("목록 조회하기전 받은 파라미터");
    console.log("요청 URL >>>>>>>>>>>> :" +`/api/v1/sales/salesList/${salesStatus}?page=${currentPage}&schType=${schType}&schText=${schText}`);
    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/sales/salesList/${salesStatus}?page=${currentPage}&schType=${schType}&schText=${schText}`);
        
        console.log('callSalesListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getSalesList(result));
        }
    }
};

//상품 목록
export const callSalesProductListAPI = () => {

    console.log("목록 조회하기전 받은 파라미터");
    console.log("요청 URL >>>>>>>>>>>> :" +`/api/v1/sales/productList`);
    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/sales/productList`);
        
        console.log('callSalesProductListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getSalesProductList(result));
        }
    }
};


//영업 통계
export const callsalesStatisticsAPI = () => {

    console.log("목록 조회하기전 받은 파라미터");
    console.log("요청 URL >>>>>>>>>>>> :" +`/api/v1/sales/salesStatistics/all`);
    return async (dispatch, getState) => {

        const result = await request('GET', `/api/v1/sales/salesStatistics/all`);
        
        console.log('callsalesStatisticsAPI result : ', result);

        if(result.status === 200) {
            dispatch(getSalesStatistics(result));
        }
    }
};