            import Header from "../components/common/Header";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import Menu from "../components/common/Menu";
import '../css/Menu.css'


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