import {NavLink} from "react-router-dom";

function MyPageNavbar() {

    return (
        <div className="employeeRegistration-navbar-div">
        <div className="salesRegistration-btns">
            <div className="salesRegistration-btn"><strong>영업 관리</strong></div>
            <div className="salesRegistration-btn"><strong>거래처 관리</strong></div>

        </div>
            <ul className="employeeRegistration-navbar-ul">
                <h3 className="main-title">영업 진행도별 조회</h3>
                <li><NavLink to="/sales/salesList/0">전체</NavLink></li>
                <li ><NavLink to="/sales/salesList/1">접수</NavLink></li>
                <li ><NavLink to="/sales/salesList/2">진행</NavLink></li>
                <li ><NavLink to="/sales/salesList/3">완결</NavLink></li>

            </ul>
            <ul className="employeeRegistration-navbar-ul">
                <h3 className="main-title">영업통계</h3>
                <li><NavLink to="/sales/salesStatistics">월별 통계</NavLink></li>
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

export default MyPageNavbar;