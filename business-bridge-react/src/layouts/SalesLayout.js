import {Outlet} from "react-router-dom";
import SalesNavbar from "../components/common/SalesNavbar";
import {useState} from "react";


function SalesLayout () {
    const[clicked,isClicked] = useState(false)
    return (

    <>
        <div className="sales-layout-div">
            <SalesNavbar/>
            <main className="sales-main">
                <Outlet/>
            </main>
        </div>
    </>
    );
}

export default SalesLayout;