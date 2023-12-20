import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {callModifyStatusStorageAPI, callModifyStatusTrashAPI, callUpdateReadAtAPI} from "../../../apis/NoteApiCalls";
import {toast, ToastContainer} from "react-toastify";
import React from "react";

function NoteItem({note}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        noteNo,
        senderPhoto,
        recipientPhoto,
        readAt,
        noteTitle,
        noteContent,
        senderName,
        senderDepartmentName,
        sentAt
    } = note;

    /* 상세조회 이동 */
    const onClickNoteHandler = async () => {
        if (!readAt) {
            try {
                await dispatch(callUpdateReadAtAPI({noteNo}));
                console.log('ReadAt 업데이트 성공');
            } catch (error) {
                console.error("ReadAt 업데이트 실패", error);
                return;
            }
        }

        navigate(`/note/recipient/${noteNo}`);
    };

    const onStorageClick = (event) => {
        event.stopPropagation();
        dispatch(callModifyStatusStorageAPI({noteNo}))
            .then((response) => {
                console.log("쪽지 보관에 성공하였습니다.")
                toast.info("쪽지를 보관함으로 이동하였습니다.", {
                    onClose: () => navigate('/note/storage', {replace: true})
                });
            })
            .catch((error) => {
                console.error("쪽지 보관에 실패하였습니다.", error)
                toast.info("쪽지 보관에 실패하였습니다.")
            });
    };

    const onTrashClick = (event) => {
        event.stopPropagation();
        dispatch(callModifyStatusTrashAPI({noteNo}))
            .then((response) => {
                console.log("쪽지 휴지통으로 이동하였습니다.")
                toast.info("쪽지를 휴지통으로 이동하였습니다.", {
                    onClose: () => navigate('/note/trash', {replace: true})
                });
            })
            .catch((error) => {
                console.error("쪽지를 휴지통으로 이동하지 못했습니다.", error)
                toast.info("쪽지 삭제에 실패하였습니다.")
            });
    };


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

    const displayTitle = truncateString(noteTitle, 29);
    const displayContent = truncateString(noteContent, 78);

    return (
        <>
            <div className="noteInfoBox" onClick={onClickNoteHandler}>
                <div className="noteInfolist">
                    <div className="noteInfolistItem">{senderPhoto &&
                        <img src={senderPhoto} alt={"사원 이미지"}/>}</div>
                    <div className="noteInfolistItem">{senderName}</div>
                    <div className="noteInfolistItem">{senderDepartmentName}</div>
                    <div className="noteInfolistItem">{displayTitle}</div>
                    <div className="noteInfolistItem">{displayContent}</div>
                    <div className="noteInfolistItem">{sentAt}</div>
                    <div className="noteInfoButtonContainer">
                        <button onClick={onStorageClick}>중요</button>
                        <button onClick={onTrashClick}>삭제</button>
                    </div>
                </div>
                <hr/>
            </div>
        </>
    );
}

export default NoteItem;
