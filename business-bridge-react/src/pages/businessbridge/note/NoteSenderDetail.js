import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {callNoteSenderDetailAPI} from "../../../apis/NoteApiCalls";
import NoteDetailItem from "../../../components/items/note/NoteDetailItem";
import {isAdmin} from "../../../utils/TokenUtils";
import {toast, ToastContainer} from "react-toastify";
import NoteSenderDetailItem from "../../../components/items/note/NoteSenderDetailItem";


function NoteSenderDetail() {

    const dispatch = useDispatch();
    const {noteNo} = useParams();
    const {note} = useSelector(state => state.noteReducer);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callNoteSenderDetailAPI({noteNo}));
    }, []);

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>

            <div className="note-info">
                <div className="note-h1">
                    <h1>보낸 쪽지 상세보기</h1>
                </div>
                <hr/>
                {
                    <div className="note-detail-div">
                        <NoteSenderDetailItem note={note} />
                    </div>
                }
            </div>
        </>
    )
}

export default NoteSenderDetail;