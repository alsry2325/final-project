import {combineReducers} from "redux";
import memberReducer from "./EmployeeModule";
import salesReducer from "./SalesModule";
import approvalReducer from "./ApprovalModule";
import addressReducer from "./AddressModule";
import accountReducer from "./AccountModule";
import noteReducer from "./NoteModule";
import productReducer from "./ProductModule";


const rootReducer = combineReducers({
    memberReducer, salesReducer, approvalReducer, addressReducer, accountReducer, noteReducer,  productReducer
});

export default rootReducer;