import {Outlet} from "react-router-dom";
import {useState} from "react";
import AddressBookNavbar from "../components/nav/AddressBookNavbar";
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";


function AddressBookLayout () {

    const[clicked,isClicked] = useState(false)
    return (
        <>
            <Header clicked={clicked} isClicked={isClicked}/>
            {clicked?<Menu/>:null}
            <div className="addressBook-layout-div">
                <AddressBookNavbar/>
                <main className="addressBook-main">
                    <Outlet/>
                </main>
            </div>
        </>
    );
}

export default AddressBookLayout;