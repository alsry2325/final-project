import {isAdmin, isLogin} from "../../utils/TokenUtils";
import {Navigate} from "react-router-dom";

function ProtectedRoute({ loginCheck, authCheck, children }) {

    console.log('protectedRoute: ' + loginCheck)

    if(authCheck) {
        /* 권한이 있어야 접근 가능한 기능 (상품 관리 - 등록, 수정, 삭제 등) */
        return isAdmin() ? children : <Navigate to="/"/>
    }

    if(loginCheck) {
        /* 로그인 해야만 볼 수 있는 기능 (메인페이지등등) */
        console.log(loginCheck)
        return isLogin() ? children : <Navigate to="/emp/employee/login"/>
    }
    else {
        /* 로그인 하면 볼 수 없는 기능 (로그인) */
        return !isLogin() ? children : <Navigate to="/"/>
    }
    if(loginCheck) {
        /* 로그인 해야만 볼 수 있는 기능 (메인페이지등등) */
        console.log(loginCheck)
        return isLogin() ? children : <Navigate to="/emp/employee/registration"/>
    }

}

export default ProtectedRoute;