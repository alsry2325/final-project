import {useNavigate} from "react-router-dom";

function NoteTrashItem({ note }) {

    const navigate = useNavigate();
    const { noteNo } = note;

    const onClickNoteHandler = () => {
        navigate(`/note/recipient/trash/${noteNo}`)
    }

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

export default NoteTrashItem;