import {Outlet} from "react-router-dom";
import EmployeeRegistrationNavbar from "../components/nav/EmployeeRegistrationNavbar";


function EmployeeRegistrationLayout () {
    return (
        <>

                <div className="employeeRegistration-layout-div">
                    <EmployeeRegistrationNavbar/>
                    <div className="employeeRegistration-main">
                        <Outlet/>
                    </div>
                </div>
        </>
    );
}

export default EmployeeRegistrationLayout;