
import {Outlet} from "react-router-dom";
import {useState} from "react";
import '../css/Menu.css'
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";


function Layout() {
    const[clicked,isClicked] = useState(false)
    return (
        <>
            <Header clicked={clicked} isClicked={isClicked}/>
            {clicked?<Menu/>:null}
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;