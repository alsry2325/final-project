import {Outlet} from "react-router-dom";
import Header from "../components/common/Header";
import ApprovalNavbar from "../components/nav/ApprovalNavbar";
import {useState} from "react";

function ApprovalLayout() {

    const[clicked,isClicked] = useState(false)
    return (
        <>
            <main className="approval-main">
                <Header clicked={clicked} isClicked={isClicked}/>
                <ApprovalNavbar/>
                <Outlet/>
            </main>
        </>
    );
}

export default ApprovalLayout;