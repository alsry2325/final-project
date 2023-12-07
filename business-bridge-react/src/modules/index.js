import {combineReducers} from "redux";
import memberReducer from "./EmployeeModule";
import salesReducer from "./SalesModule";


const rootReducer = combineReducers({
    memberReducer, salesReducer
});

export default rootReducer;