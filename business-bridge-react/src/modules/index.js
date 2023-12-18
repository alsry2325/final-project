import {combineReducers} from "redux";
import memberReducer from "./EmployeeModule";
import salesReducer from "./SalesModule";
import approvalReducer from "./ApprovalModule";
import addressReducer from "./AddressModule";
import accountReducer from "./AccountModule";
import noteReducer from "./NoteModule";


const rootReducer = combineReducers({
    memberReducer, salesReducer, approvalReducer, addressReducer, accountReducer, noteReducer
});

export default rootReducer;