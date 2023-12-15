import React, {useEffect} from "react";
import {toast} from "react-toastify";
import {callModifyStatusNormalAPI, callModifyStatusTrashAPI} from "../../../apis/NoteApiCalls";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {putSuccess} from "../../../modules/NoteModule";

function NoteStorageDetailItem({note}) {

    const dispatch = useDispatch();
    const {noteNo} = useParams();
    const navigate = useNavigate();

    const onNormalClick = () => {
        dispatch(callModifyStatusNormalAPI({noteNo}))
            .then((response) => {
                console.log("쪽지를 일반 쪽지함으로 이동하였습니다.")
                toast.info("쪽지를 일반 쪽지함으로 이동하였습니다.", {
                    onClose: () => navigate('/note/recipient', { replace: true })
                });
            })
            .catch((error) => {
                console.error("쪽지를 일반 쪽지함으로 이동하지 못했습니다.", error)
                toast.info("쪽지 이동에 실패하였습니다.")
            });
    };


    const onTrashClick = () => {
        dispatch(callModifyStatusTrashAPI({noteNo}))
            .then((response) => {
                console.log("쪽지 휴지통으로 이동하였습니다.")
                toast.info("쪽지를 휴지통으로 이동하였습니다.", {
                    onClose: () => navigate('/note/recipient', { replace: true })
                });
            })
            .catch((error) => {
                console.error("쪽지를 휴지통으로 이동하지 못했습니다.", error)
                toast.info("쪽지 삭제에 실패하였습니다.")
            });
    };


    return (

        <>
            <div className="note-detail">
                <div className="note-detail-header">
                    <div className="note-header-list">쪽지 제목</div>
                    <div className="note-header-list">보낸 사람</div>
                    <div className="note-header-list">받는 사람</div>
                    <div className="note-header-list">발송 날짜</div>
                    <div className="note-header-list">읽은 날짜</div>
                    <div className="note-header-list">내용</div>
                </div>
                <div className="note-detail-body">
                    <div className="note-body-list">{note.noteTitle}</div>
                    <div className="note-body-list">{note.senderName}</div>
                    <div className="note-body-list">{note.recipientName}</div>
                    <div className="note-body-list">{note.sentAt}</div>
                    <div className="note-body-list">{note.readAt}</div>
                    <div className="note-body-list2">{note.noteContent}</div>
                </div>
            </div>

            <div className="note-btn-container">
                <button className="note-storage-btn" onClick={onNormalClick}>
                    보관 해제
                </button>
                <button className="note-delete-btn" onClick={onTrashClick}>
                    삭제
                </button>
            </div>

        </>
    );

}

export default NoteStorageDetailItem;
