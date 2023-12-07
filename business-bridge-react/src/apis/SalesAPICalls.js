import {authRequest, request} from "./Api";
import {getSalesList, getSales, postSuccess} from "../modules/SalesModule";
import {useDispatch, useSelector} from "react-redux";

//영업 등록
export const callSalesRegistAPI = ({ registRequest }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post('/api/v1/sales',
            JSON.stringify(registRequest),
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
                console.log("api 요청결과");
                console.log(e)
        });

        console.log('callSalesRegistAPI result : ', result);

        if(result?.status === 201) {
            dispatch(postSuccess());
        }
    }
}

//영업 상세조회
export const callSalesAPI = ({ salesCode }) => {

    return async (dispatch, getState) => {

        const result = await request('GET',`/api/v1/sales/${salesCode}`);
        console.log('callSalesAPI result : ', result);
        if(result?.status === 200) {
            dispatch(getSales(result));
        }
    }
}

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