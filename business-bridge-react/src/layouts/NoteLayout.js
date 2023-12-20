import {Outlet} from "react-router-dom";
import {useState} from "react";
import AddressBookNavbar from "../components/nav/AddressBookNavbar";
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";
import NoteNavbar from "../components/nav/NoteNavbar";


function NoteLayout () {

    const[clicked,isClicked] = useState(false)
    return (
        <>
            <div className="note-layout-div">
                <NoteNavbar/>
                <main className="note-main">
                    <Outlet/>
                </main>
            </div>
        </>
    );
}

export default NoteLayout;