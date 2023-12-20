import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    callNoteTrashListAPI
} from "../../../apis/NoteApiCalls";
import PagingBar from "../../../components/common/PagingBar";
import {useNavigate} from "react-router-dom";
import NoteTrashList from "../../../components/lists/NoteTrashList";
import {ToastContainer} from "react-toastify";


function NoteStorage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {notes} = useSelector(state => state.noteReducer);


    useEffect(() => {
        dispatch(callNoteTrashListAPI({currentPage}));
    }, [dispatch, currentPage]);


    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="note-div">
                <div className="note-wrapper">
                    <h1 className="note-h1">휴지통</h1>
                </div>
                <hr/>
                <div className="noteList">
                    <div className="noteListHeader">보낸사람</div>
                    <div className="noteListHeader">부서</div>
                    <div className="noteListHeader">제목</div>
                    <div className="noteListHeader">내용</div>
                    <div className="noteListHeader">받은 날짜</div>
                </div>
                <hr/>

                <>
                    {notes
                        &&
                        <NoteTrashList data={notes.data}/>
                    }
                </>

                {notes && (
                    <div className="paging-bar-container">
                        <PagingBar pageInfo={notes.pageInfo} setCurrentPage={setCurrentPage}/>
                    </div>
                )}
            </div>
        </>
    );
}

export default NoteStorage;
