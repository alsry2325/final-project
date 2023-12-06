import {NavLink} from "react-router-dom";

function EmployeeRegistrationNavbar() {

    return (
            <div className="employeeRegistration-navbar-div">
                <div className="employeeRegistration-btn"><strong>주요 추가 버튼</strong></div>
                <ul className="employeeRegistration-navbar-ul">
                    <h3 className="main-title">전사게시판</h3>
                    <li><NavLink to="/emp/employee/registration">선택된 게시판</NavLink></li>
                    <li ><NavLink to="/">선택된 게시판</NavLink></li>
                </ul>
                <ul className="employeeRegistration-navbar-ul">
                    <h3 className="main-title">자유롭게</h3>
                    <img className="main-icon" src="/images/edit1.png" alt="My Image" />
                    <img src="/images/settings 1.png" alt="My Image" />
                    <li><NavLink to="/">수정해서</NavLink></li>
                    <li ><NavLink to="/">+ 쓰삼</NavLink></li>
                </ul>
            </div>

    );
}

export default EmployeeRegistrationNavbar;