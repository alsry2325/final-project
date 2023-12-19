import {NavLink} from "react-router-dom";

function NoteNavbar() {

    return (
        <div className="note-navbar-div">
            <div className="note-send-btn">
                <NavLink to="/note/send">
                    <strong>쪽지 발송</strong>
                </NavLink>
            </div>
            <ul className="note-navbar-ul">
                <h3 className="main-title">받은 쪽지함</h3>
                <li><NavLink to="/note/recipient">받은 쪽지함</NavLink></li>
                <li ><NavLink to="/note/storage">중요 쪽지함</NavLink></li>
            </ul>
            <ul className="note-navbar-ul">
                <h3 className="main-title">보낸 쪽지함</h3>
                <li><NavLink to="/note/sender">보낸 쪽지함</NavLink></li>
            </ul>
            <ul className="note-navbar-ul">
                <h3 className="main-title">기타</h3>
                <li><NavLink to="/note/trash">휴지통</NavLink></li>
            </ul>
        </div>

    );
}

export default NoteNavbar;