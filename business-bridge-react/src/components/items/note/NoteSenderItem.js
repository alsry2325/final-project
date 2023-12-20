import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {callModifySenderStatusDeleteAPI} from "../../../apis/NoteApiCalls";
import {toast} from "react-toastify";
import React from "react";

function NoteSenderItem({ note }) {

    const navigate = useNavigate();
    const { noteNo } = note;
    const dispatch = useDispatch();

    const onDeleteClick = (event) => {
        event.stopPropagation();
        dispatch(callModifySenderStatusDeleteAPI({noteNo}))
            .then((response) => {
                console.log("쪽지를 삭제하였습니다.")
                toast.info("쪽지를 삭제하였습니다.", {
                    onClose: () => navigate('/note/sender', { replace: true })
                });
            })
            .catch((error) => {
                console.error("쪽지 삭제에 실패하였습니다.", error)
                toast.info("쪽지 삭제에 실패하였습니다.")
            });
    };

    const onClickNoteHandler = () => {
        navigate(`/note/sender/${noteNo}`)
    }

    /* title, content 내용 줄이기 */
    const getUTF8ByteSize = str => {
        return new Blob([str]).size;
    };

    const truncateString = (str, maxSize) => {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            size += getUTF8ByteSize(str[i]);
            if (size > maxSize) {
                return str.slice(0, i) + "...";
            }
        }
        return str;
    };

    const displayTitle = truncateString(note.noteTitle, 29);
    const displayContent = truncateString(note.noteContent, 78);

    return (
        <>
        <div
            className = "noteInfoBox"
            onClick = { onClickNoteHandler }
        >
            <div className="noteInfolist">
                <div className="noteInfolistItem">{note.recipientPhoto &&
                    <img src={note.recipientPhoto} alt={"사원 이미지"}/>}</div>
                <div className="noteInfolistItem">{note.recipientName}</div>
                <div className="noteInfolistItem">{note.recipientDepartmentName}</div>
                <div className="noteInfolistItem">{displayTitle}</div>
                <div className="noteInfolistItem">{displayContent}</div>
                <div className="noteInfolistItem">{note.readAt||'아직 읽지 않음'}</div>
                <div className="noteInfoButtonContainer">
                    <button className="recover-button">복구</button>
                    <button onClick={onDeleteClick}>삭제</button>
                </div>
            </div>
            <hr/>
        </div>
        </>
    );
}

export default NoteSenderItem;