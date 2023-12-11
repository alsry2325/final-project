import {Outlet} from "react-router-dom";
import ApprovalNavbar from "../components/nav/ApprovalNavbar";
import {useState} from "react";

function ApprovalLayout() {

    const[clicked,isClicked] = useState(false)
    return (
        <>
            <main className="approval-main employeeRegistration-layout-div">
                <ApprovalNavbar/>
                <Outlet/>
            </main>
        </>
    );
}

export default ApprovalLayout;