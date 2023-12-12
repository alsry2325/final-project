import {Navigate} from "react-router-dom";
import {isAdmin, isLogin} from "../utils/TokenUtils";

function ProtectedRoute({loginCheck, authCheck, children}) {

    if(authCheck) {
        /* 권한이 있어야 접근 가능한 기능 */
        return isAdmin() ? children : <Navigate to="/"/>
    }

    if (loginCheck) {
        return isLogin() ? children : <Navigate to ="/"/>

    }
}