import {Outlet} from "react-router-dom";
import EmployeeRegistrationNavbar from "../components/nav/EmployeeRegistrationNavbar";


function EmployeeRegistrationLayout () {
    return (
        <>

                <main className="employeeRegistration-layout-div">
                    <EmployeeRegistrationNavbar/>
                    <div className="employeeRegistration-main">
                        <Outlet/>
                    </div>
                </main>
        </>
    );
}

export default EmployeeRegistrationLayout;