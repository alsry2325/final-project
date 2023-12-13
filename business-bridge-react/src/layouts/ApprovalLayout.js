import {Outlet} from "react-router-dom";
import ApprovalNavbar from "../components/nav/ApprovalNavbar";
import {useState} from "react";

function ApprovalLayout() {

    const[clicked,isClicked] = useState(false)
    return (
        <>
            <main className="employeeRegistration-layout-div">
                <ApprovalNavbar/>
                <div className="approval-main">
                    <Outlet/>
                </div>
            </main>
        </>
    );
}

export default ApprovalLayout;