import {combineReducers} from "redux";
import memberReducer from "./EmployeeModule";
import salesReducer from "./SalesModule";
import approvalReducer from "./ApprovalModule";
import addressReducer from "./AddressModule";


const rootReducer = combineReducers({
    memberReducer, salesReducer, approvalReducer, addressReducer
});

export default rootReducer;