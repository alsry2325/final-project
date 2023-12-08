import {Navigate} from "react-router-dom";
import {isLogin} from "../utils/TokenUtils";

function ProtectedRoute({loginCheck, children}) {

    if (loginCheck) {
        return isLogin() ? children : <Navigate to ="/"/>

    }
}