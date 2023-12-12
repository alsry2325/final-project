import {NavLink} from "react-router-dom";
import {isAdmin} from "../../utils/TokenUtils";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callEmployeeAPI} from "../../apis/EmployeeAPICalls";
function Menu() {

    const dispatch = useDispatch();
    const { myPageInfo } = useSelector(state => state.memberReducer);
    useEffect(() => {
        dispatch(callEmployeeAPI());
    }, []);

    return (
        <>
            <div className="Navbars">
                <ul className="NavbarWrappers">
                    <li className="NavImage">
                        <NavLink className="Menu-Image-myPage" to="/sign-up">
                            <img className="Menu-Image-myPage" src={myPageInfo.emplyPhoto} alt="My Image" />
                        </NavLink>
                    </li>
                    <li className="NavbarElement">
                        <strong>{myPageInfo.emplyName}{myPageInfo.position}</strong>
                    </li>
                    <li className="NavbarElement">
                        <NavLink className="link" to="/">
                            홈
                        </NavLink>
                    </li>
                    <li className="NavbarElement">
                        <NavLink className="link" to="/about-us">
                            주소록
                        </NavLink>
                    </li>
                    <li className="NavbarElement">
                        <NavLink className="link"to="/contact-us">
                            쪽지
                        </NavLink>
                    </li>
                    <li className="NavbarElement">
                        <NavLink className="link" to="/sign-in">
                           캘린더
                        </NavLink>
                    </li>
                    <li className="NavbarElement">
                        <NavLink className="link" to="/sign-in">
                            공지사항
                        </NavLink>
                    </li>
                    <li className="NavbarElement">
                        <NavLink className="link" to="/approval/home">
                            전자결재
                        </NavLink>
                    </li>
                    <li className="NavbarElement">
                        <NavLink className="link" to="/sign-in">
                            고객관계관리
                        </NavLink>
                    </li>
                    { isAdmin() && <li className="NavbarElement">
                        <NavLink className="link" to="/sign-in">
                            상품관리
                        </NavLink>
                    </li>}
                    { isAdmin() && <li className="NavbarElement">
                        <NavLink className="link" to="/emp/employee/registration">
                            사원관리
                        </NavLink>
                    </li>}
                </ul>
            </div>
        </>
    );
}

export default Menu;