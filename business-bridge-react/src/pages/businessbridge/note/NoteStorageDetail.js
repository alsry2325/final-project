import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {callNoteStorageDetailAPI} from "../../../apis/NoteApiCalls";
import {isAdmin} from "../../../utils/TokenUtils";
import {toast, ToastContainer} from "react-toastify";
import NoteStorageDetailItem from "../../../components/items/note/NoteStorageDetailItem";


function NoteStorageDetail() {

    const dispatch = useDispatch();
    const {noteNo} = useParams();
    const {note} = useSelector(state => state.noteReducer);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callNoteStorageDetailAPI({noteNo}));
    }, []);

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>

            <div className="note-info">
                <div className="note-h1">
                    <h1>중요 쪽지 상세보기</h1>
                </div>
                <hr/>
                {
                    note &&
                    <div className="note-detail-div">
                        <NoteStorageDetailItem note={note} />
                    </div>
                }
            </div>
        </>
    )
}

export default NoteStorageDetail;