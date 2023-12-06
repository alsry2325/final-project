import {combineReducers} from "redux";
import memberReducer from "./EmployeeModule";



const rootReducer = combineReducers({
    memberReducer
});

export default rootReducer;