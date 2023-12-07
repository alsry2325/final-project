import {Link, NavLink, useNavigate} from "react-router-dom";
import {ImCross} from "react-icons/im";
import {GiHamburgerMenu} from "react-icons/gi";
import {useEffect, useState} from "react";
import {isAdmin, isLogin, removeToken} from "../../utils/TokenUtils";
import {useDispatch, useSelector} from "react-redux";
import {callEmployeeAPI} from "../../apis/EmployeeAPICalls";
function Header({clicked, isClicked}){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuVisible, setMenuVisible] = useState(false);
    const { myPageInfo } = useSelector(state => state.memberReducer);
    useEffect(() => {
        dispatch(callEmployeeAPI());
    }, []);

    const handleClicked = () => {
        isClicked(!clicked);
        console.log("clicked")
    };
    const handleClick  = () => {
        setMenuVisible((prevVisible) => !prevVisible);
    };

    const onClickLogoutHandler = () => {
        removeToken();
        window.location.replace("/emp/employee/login");
    }

    const onClickMypageHandler = () => {
        navigate('/emp/employee/mypage');
    }

    return (
        <>
            { myPageInfo &&
           <div className="Nav">
               <ul className="NavbarWrapper">
                   <li className="NavLogo">
                       <Link style={{textDecoration:'none', color:'white',padding:10 }} to="/">
                           <img className="main-Image" src="/images/mainImage3.png" alt="My Image" />
                           BusinessBridge
                       </Link>
                   </li>
                   <li className="NavElements">
                       <NavLink className="Link" to="/">
                           홈
                       </NavLink>
                   </li>
                   <li className="NavElements">
                       <NavLink className="Link" to="/about-us">
                           주소록
                       </NavLink>
                   </li>
                   <li className="NavElements">
                       <NavLink className="Link" to="/contact-us">
                           쪽지
                       </NavLink>
                   </li>
                   <li className="NavElements">
                       <NavLink className="Link" to="/contact-us">
                           캘린더
                       </NavLink>
                   </li>
                   <li className="NavElements">
                       <NavLink className="Link" to="/contact-us">
                           공지사항
                       </NavLink>
                   </li>
                   <li className="NavElements">
                       <NavLink className="Link" to="/contact-us">
                           전자결제
                       </NavLink>
                   </li>
                   <li className="NavElements">
                       <NavLink className="Link" to="/sales/salesList/1">
                           고객관계관리
                       </NavLink>
                   </li>
                   <li className="NavElements">
                       <NavLink className="Link"  to="/contact-us">
                           견적서 관리
                       </NavLink>
                   </li>
                   { isAdmin() &&  <li className="NavElements">
                       <NavLink className="Link" to="/contact-us">
                           상품 관리
                       </NavLink>
                   </li>}
                   { isAdmin() && <li className="NavElements">
                       <NavLink className="Link" to="/emp/employee/registration">
                           사원 관리
                       </NavLink>
                   </li>}
                   <li className="NavName">
                       <p>{myPageInfo.emplyName}{myPageInfo.position}님</p>
                   </li>
                   <li
                       onClick={handleClick}
                       className="Image-myPage"
                       style={{ float: "right", margin: "-15px 2px 1px 2px" }}
                   >
                       <img className="Image-myPage" src="/images/employee-image.png" alt="My Image" />
                       {isMenuVisible && (
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
                       )}
                   </li>
               </ul>
               {!clicked ? (
                   <GiHamburgerMenu
                       onClick={handleClicked} className="Icon" />
               ) : (
                   <ImCross onClick={handleClicked} className="Icon" />
               )}
           </div>
            }
        </>
       );

}


export default Header;