import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 = 어떤 걸 요청할건지? */
const GET_ADDRESS = 'address/GET_ADDRESS';
const GET_ADDRESS_DETAIL = 'address/GET_ADDRESS_DETAIL'

/* 액션 함수 = 액션 객체를 만들어서 반환, 여러 액션을 반환하기 위해서는 actions
* 첫 번째 키 값은 액션의 타입, 반환값이 payload : 반환값
* 액션 함수 네이밍 규칙 : 중첩 구조분해 할당, 카멜케이스 -> 언더스코어 케이스
* address/GET_ADDRESS에서 가져옴 */
export const { address : { getAddress, getAddressDetail } } = createActions({
    [GET_ADDRESS] : result => ({ address : result.data }),
    [GET_ADDRESS_DETAIL] : result => ({ address : result.data })
});

/* 리듀서 함수 = 액션을 받아서 어떻게 처리할건지? 키 값 : 액션 타입, 반환값 : state에 저장 되는 값
* 이 리듀서에 저장된 값이 반환됨 */
const addressReducer = handleActions({
    [GET_ADDRESS] : (state, {payload}) => payload,
    [GET_ADDRESS_DETAIL] : (state, {payload}) => payload
}, initialState);

export default addressReducer;