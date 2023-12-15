import {useNavigate} from "react-router-dom";

function NoteSenderItem({ note }) {

    const navigate = useNavigate();
    const { noteNo } = note;

    const onClickNoteHandler = () => {
        navigate(`/note/sender/${noteNo}`)
    }

    return (
        <div
            className = "noteInfoBox"
            onClick = { onClickNoteHandler }
        >
            <div className="noteInfolist">
                <div className="noteInfolistItem">{note.recipientName}</div>
                <div className="noteInfolistItem">{note.recipientDepartmentName}</div>
                <div className="noteInfolistItem">{note.noteTitle}</div>
                <div className="noteInfolistItem">{note.noteContent}</div>
                <div className="noteInfolistItem">{note.sentAt}</div>
            </div>
            <hr/>
        </div>
    );
}

export default NoteSenderItem;