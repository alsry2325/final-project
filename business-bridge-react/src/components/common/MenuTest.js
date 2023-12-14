import {removeToken} from "../../utils/TokenUtils";
import {useNavigate} from "react-router-dom";

function MenuTest() {

    const navigate = useNavigate();
    const onClickLogoutHandler = () => {
        removeToken();
        window.location.replace("/emp/employee/login");
    }

    const onClickMypageHandler = () => {
        navigate('/emp/employee/mypage');
    }

    return(
        <div className="menu">
            <ul className="NavbarWrapper">
                <li className="menu-Link">
                    <span className="menu-Link"
                          onClick={onClickMypageHandler}>
                        기본정보
                    </span>
                </li>
                <li className="menu-Link">
                    <span
                        className="menu-Link"
                        onClick={onClickLogoutHandler}
                    >
                        로그아웃
                    </span>
                </li>
            </ul>
        </div>
    );

}

export default MenuTest;