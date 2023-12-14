import {NavLink} from "react-router-dom";

function EmployeeRegistrationNavbar() {

    return (
            <div className="employeeRegistration-navbar-div">
                <div className="employeeRegistration-btn"><strong>직원 등록</strong></div>
                <ul className="employeeRegistration-navbar-ul">
                    <h3 className="main-title">사원관리</h3>
                    <li><NavLink to="/emp/employee/registration">사원등록</NavLink></li>
                    <li ><NavLink to="/emp/employee/registrationList">부서/직위 수정</NavLink></li>
                </ul>
                {/*<ul className="employeeRegistration-navbar-ul">*/}
                {/*    <h3 className="main-title">자유롭게</h3>*/}
                {/*    <img className="main-icon" src="/images/edit1.png" alt="My Image" />*/}
                {/*    <img src="/images/settings 1.png" alt="My Image" />*/}
                {/*    <li><NavLink to="/">수정해서</NavLink></li>*/}
                {/*    <li ><NavLink to="/">+ 쓰삼</NavLink></li>*/}
                {/*</ul>*/}
            </div>

    );
}

export default EmployeeRegistrationNavbar;