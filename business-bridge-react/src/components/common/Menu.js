import {NavLink} from "react-router-dom";
import {isAdmin} from "../../utils/TokenUtils";
function Menu() {

    return (
        <>
            <div className="Navbars">
                <ul className="NavbarWrappers">
                    <li className="NavImage">
                        <NavLink className="Menu-Image-myPage" to="/sign-up">
                            <img className="Menu-Image-myPage" src="/images/employee-image.png" alt="My Image" />
                        </NavLink>
                    </li>
                    <li className="NavbarElement">
                        <strong>정민교사원님</strong>
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
                        <NavLink className="link" to="/sign-in">
                            전자결제
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
                        <NavLink className="link" to="/sign-in">
                            사원관리
                        </NavLink>
                    </li>}
                </ul>
            </div>
        </>
    );
}

export default Menu;