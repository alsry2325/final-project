import {Outlet} from "react-router-dom";
import EmployeeRegistrationNavbar from "../components/nav/EmployeeRegistrationNavbar";
import {useState} from "react";
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";

function EmployeeRegistrationNavbarLayout () {

    const[clicked,isClicked] = useState(false)
    return (
        <>
            <div className="employeeRegistration-layout-div">
                <EmployeeRegistrationNavbar/>
                <main className="employeeRegistration-main">
                    <Outlet/>
                </main>
            </div>
        </>
    );
}

export default EmployeeRegistrationNavbarLayout;