import {NavLink} from "react-router-dom";

function MyPageNavbar() {

    return (

        <div className="salesRegistration-navbar-div">
            <div className="cusRelationMangement">
                <h2 className="cusRelationMangement-h1">고객 관리</h2>
            </div>
            <div className="salesRegistration-btn"><strong>영업 관리</strong></div>
            <ul className="employeeRegistration-navbar-ul">
                <h3 className="main-title">영업 진행도별 조회</h3>
                <li><NavLink to="/sales/salesList/0">전체</NavLink></li>
                <li ><NavLink to="/sales/salesList/1">접수</NavLink></li>
                <li ><NavLink to="/sales/salesList/2">진행</NavLink></li>
                <li ><NavLink to="/sales/salesList/3">완결</NavLink></li>

            </ul>
            <ul className="employeeRegistration-navbar-ul">
                <h3 className="main-title">영업통계</h3>
                <li><NavLink to="/sales/salesStatistics">실적 통계</NavLink></li>
            </ul>
            {/*<ul className="employeeRegistration-navbar-ul">*/}
            {/*    <h3 className="main-title">자유롭게</h3>*/}
            {/*    <img className="main-icon" src="/images/edit1.png" alt="My Image" />*/}
            {/*    <img src="/images/settings 1.png" alt="My Image" />*/}
            {/*    <li><NavLink to="/">수정해서</NavLink></li>*/}
            {/*    <li ><NavLink to="/">+ 쓰삼</NavLink></li>*/}
            {/*</ul>*/}

            <div className="salesRegistration-btn"><strong>거래처 관리</strong></div>
            <ul className="employeeRegistration-navbar-ul">
                <h3 className="main-title">거래처 부서별 조회</h3>
                <li><NavLink to="/account/accountList/0">전체부서</NavLink></li>
                <li><NavLink to="/account/accountList/1">영업본부</NavLink></li>
                <li><NavLink to="/account/accountList/3">마게팅본부</NavLink></li>
                <li><NavLink to="/account/accountList/4">일반영업부</NavLink></li>

            </ul>
        </div>
    );
}

export default MyPageNavbar;