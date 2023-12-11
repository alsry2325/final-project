import {combineReducers} from "redux";
import memberReducer from "./EmployeeModule";
import salesReducer from "./SalesModule";
import approvalReducer from "./ApprovalModule";


const rootReducer = combineReducers({
    memberReducer, salesReducer, approvalReducer
});

export default rootReducer;