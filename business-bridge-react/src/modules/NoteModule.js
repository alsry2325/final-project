import {createActions, handleActions} from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 타입 = 어떤 걸 요청할건지? */
const GET_NOTE = 'note/GET_NOTE';

/* 액션 함수 = 액션 객체를 만들어서 반환, 여러 액션을 반환하기 위해서는 actions */
export const { note : { getNote } } = createActions({
    [GET_NOTE] : result => ({ note : result.data }),
});

/* 리듀서 함수 = 액션을 받아서 어떻게 처리할건지? 키 값 : 액션 타입, 반환값 : state에 저장 되는 값
* 이 리듀서에 저장된 값이 반환됨 */
const noteReducer = handleActions({
    [GET_NOTE]: (state, { payload }) => ({ ...state, ...payload })
}, initialState);

export default noteReducer;