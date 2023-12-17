import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callUpdateReadAtAPI } from "../../../apis/NoteApiCalls";


function NoteItem({ note }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { noteNo, readAt } = note;

    const onClickNoteHandler = async () => {
        if (!readAt) {
            try {
                await dispatch(callUpdateReadAtAPI({ noteNo }));
                console.log('ReadAt 업데이트 성공');
            } catch (error) {
                console.error("ReadAt 업데이트 실패", error);
                return;
            }
        }

        navigate(`/note/recipient/${noteNo}`);
    };

    return (
        <div
            className = "noteInfoBox"
            onClick = { onClickNoteHandler }
        >
            <div className="noteInfolist">
                <div className="noteInfolistItem">{note.senderName}</div>
                <div className="noteInfolistItem">{note.senderDepartmentName}</div>
                <div className="noteInfolistItem">{note.noteTitle}</div>
                <div className="noteInfolistItem">{note.noteContent}</div>
                <div className="noteInfolistItem">{note.sentAt}</div>
            </div>
            <hr/>
        </div>
    );
}

export default NoteItem;