import NoteList from "../lists/NoteList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callNoteRecipientListAPI} from "../../apis/NoteApiCalls";

function NoteRecipeientList() {
    const dispatch = useDispatch();
    const {notes} = useSelector(state => state.noteReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callNoteRecipientListAPI({currentPage}));
    }, [dispatch, currentPage]);

    return (

        <>
            <div className="main-note-div">
                <div className="main-note-wrapper-title">
                    <h3>쪽지함</h3>
                </div>
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
                        <NoteList data={notes.data}/>
                    }
                </>
            </div>
        </>
    );
}

export default NoteRecipeientList;