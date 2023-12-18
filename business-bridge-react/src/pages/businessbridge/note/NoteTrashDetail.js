import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {callNoteTrashDetailAPI} from "../../../apis/NoteApiCalls";
import {isAdmin} from "../../../utils/TokenUtils";
import {toast, ToastContainer} from "react-toastify";
import NoteTrashDetailItem from "../../../components/items/note/NoteTrashDetailItem";


function NoteStorageDetail() {

    const dispatch = useDispatch();
    const {noteNo} = useParams();
    const {note} = useSelector(state => state.noteReducer);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callNoteTrashDetailAPI({noteNo}));
    }, []);

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>

            <div className="note-info">
                <div className="note-h1">
                    <h1>휴지통 쪽지 상세보기</h1>
                </div>
                <hr/>
                {
                    note &&
                    <div className="note-detail-div">
                        <NoteTrashDetailItem note={note} />
                    </div>
                }
            </div>
        </>
    )
}

export default NoteStorageDetail;