import {combineReducers} from "redux";
import memberReducer from "./EmployeeModule";
import salesReducer from "./SalesModule";
import approvalReducer from "./ApprovalModule";
import addressReducer from "./AddressModule";
import productReducer from "./ProductModule";


const rootReducer = combineReducers({
    memberReducer, salesReducer, approvalReducer, addressReducer,
    productReducer
});

export default rootReducer;