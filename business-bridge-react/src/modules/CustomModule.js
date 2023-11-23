/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const TEST_SUCCESS = 'test/TEST_SUCCESS';

/* 액션 함수 */
export const { test:{getTest} } = createActions({
        [TEST_SUCCESS] :() =>{}
});

/* 리듀서 함수 */
const costomReducer = handleActions({
        [TEST_SUCCESS] :() =>{}
}, initialState);

export default costomReducer;