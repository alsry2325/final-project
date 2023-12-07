import {NavLink} from "react-router-dom";

function ApprovalNavbar() {

    return (
            <div className="employeeRegistration-navbar-div">
                <div className="employeeRegistration-btn">
                    <img
                        className="approval-nav-img"
                        src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/8e4d95de-6131-4737-bd12-5f8dd0d6feed"/>
                    <strong>결재 상신</strong>
                </div>
                <ul className="employeeRegistration-navbar-ul">
                    <h3 className="main-title">결재하기</h3>
                    <li><NavLink to="/approval/receive-approvals/all">받은 결재</NavLink></li>
                    <li ><NavLink to="/">받을 결재</NavLink></li>
                </ul>
                <ul className="employeeRegistration-navbar-ul">
                    <h3 className="main-title">문서함</h3>
                    {/*<img className="main-icon" src="/images/edit1.png" alt="My Image" />*/}
                    {/*<img src="/images/settings 1.png" alt="My Image" />*/}
                    <li><NavLink to="/">기안한 문서함</NavLink></li>
                    <li ><NavLink to="/">기안 회수함</NavLink></li>
                    <li ><NavLink to="/">임시 저장함</NavLink></li>
                    <li ><NavLink to="/">결재한 문서함</NavLink></li>
                </ul>
            </div>

    );
}

export default ApprovalNavbar;