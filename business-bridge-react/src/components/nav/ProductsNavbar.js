import {NavLink} from "react-router-dom";

function ProductsNavbar() {

    return (
        <div className="employeeRegistration-navbar-div">
            <div className="employeeRegistration-btn"><strong>상품 입력</strong></div>
            <ul className="employeeRegistration-navbar-ul">
                <h3 className="main-title">상품관리</h3>
                <li><NavLink to="/emp/employee/registration">상품목록</NavLink></li>
            </ul>
        </div>
    );
}

export default ProductsNavbar;