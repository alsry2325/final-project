import {NavLink} from "react-router-dom";

function AddressBookNavbar() {

    return (
        <div className="addressBook-navbar-div">
            <ul className="addressBook-navbar-ul">
                <h3 className="main-title">공용 주소록</h3>
                <li><NavLink to="/addressBook/main">전사 주소록</NavLink></li>
                <li><NavLink to="/addressBook/"></NavLink></li>
            </ul>
            <ul className="addressBook-navbar-ul">
                <h3 className="main-title">부서 주소록</h3>
                <img className="main-icon" src="/images/edit1.png" alt="My Image"/>
                <img src="/images/settings 1.png" alt="My Image"/>
                <li><NavLink to="/addressBook/department/1">영업본부</NavLink></li>
                <li><NavLink to="/addressBook/department/2/">경영관리본부</NavLink></li>
                <li><NavLink to="/addressBook/department/3/">마케팅본부</NavLink></li>
                <li><NavLink to="/addressBook/department/4/">일반영업부</NavLink></li>
                <li><NavLink to="/addressBook/department/5/">재무회계부</NavLink></li>
                <li><NavLink to="/addressBook/department/6/">거래처관리부</NavLink></li>
                <li><NavLink to="/addressBook/department/7/">기획부</NavLink></li>
            </ul>
        </div>
    );
}

export default AddressBookNavbar;