import {useNavigate} from "react-router-dom";
import {callModifyStatusDeleteAPI, callModifyStatusNormalAPI} from "../../../apis/NoteApiCalls";
import {toast, ToastContainer} from "react-toastify";
import {useDispatch} from "react-redux";
import React from "react";

function NoteTrashItem({note}) {

    const navigate = useNavigate();
    const {noteNo} = note;
    const dispatch = useDispatch();

    const onClickNoteHandler = () => {
        navigate(`/note/recipient/trash/${noteNo}`)
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


    const onNormalClick = (event) => {
        event.stopPropagation();
        dispatch(callModifyStatusNormalAPI({noteNo}))
            .then((response) => {
                console.log("쪽지를 일반 쪽지함으로 이동하였습니다.")
                toast.info("쪽지를 일반 쪽지함으로 이동하였습니다.", {
                    autoClose: 2000, // 토스트가 2초 후에 자동으로 닫힘
                });
                setTimeout(() => {
                    navigate('/note/recipient', {replace: true});
                }, 2000); // 토스트가 닫힌 후 이동
            })
            .catch((error) => {
                console.error("쪽지를 일반 쪽지함으로 이동하지 못했습니다.", error)
                toast.info("쪽지 이동에 실패하였습니다.")
            });
    };

    const onDeleteClick = (event) => {
        event.stopPropagation();
        dispatch(callModifyStatusDeleteAPI({noteNo}))
            .then((response) => {
                console.log("쪽지를 삭제하였습니다.")
                toast.info("쪽지를 삭제하였습니다.", {
                    autoClose: 2000, // 토스트가 2초 후에 자동으로 닫힘
                });
                setTimeout(() => {
                    navigate('/note/trash', {replace: true});
                }, 2000); // 토스트가 닫힌 후 이동
            })
            .catch((error) => {
                console.error("쪽지 삭제에 실패하였습니다.", error)
                toast.info("쪽지 삭제에 실패하였습니다.")
            });
    };


    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div
                className="noteInfoBox"
                onClick={onClickNoteHandler}
            >
                <div className="noteInfolist">
                    <div className="noteInfolistItem">{note.senderPhoto &&
                        <img src={note.senderPhoto} alt={"사원 이미지"}/>}</div>
                    <div className="noteInfolistItem">{note.senderName}</div>
                    <div className="noteInfolistItem">{note.senderDepartmentName}</div>
                    <div className="noteInfolistItem">{displayTitle}</div>
                    <div className="noteInfolistItem">{displayContent}</div>
                    <div className="noteInfolistItem">{note.sentAt}</div>
                    <div className="noteInfoButtonContainer">
                        <button onClick={onNormalClick}>복구</button>
                        <button onClick={onDeleteClick}>삭제</button>
                    </div>
                </div>
                <hr/>
            </div>
        </>
    );
}

export default NoteTrashItem;