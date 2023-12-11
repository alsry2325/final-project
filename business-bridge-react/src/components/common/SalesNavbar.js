import {NavLink} from "react-router-dom";

function MyPageNavbar() {

    return (
        <div className="mypage-navbar-div">
            <ul className="mypage-navbar-ul">
                <li>영업 진행도별 관리</li>
                <li><NavLink to="/sales/salesList/0"> - 전체</NavLink></li>
                <li><NavLink to="/sales/salesList/1"> - 접수</NavLink></li>
                <li><NavLink to="/sales/salesList/2"> - 진행</NavLink></li>
                <li><NavLink to="/sales/salesList/3"> - 완결</NavLink></li>
            </ul>
            <ul className="mypage-navbar-ul">
                <li><NavLink to="/sales/salesStatistics"> 월별 통계</NavLink></li>
            </ul>
        </div>
    );
}

export default MyPageNavbar;