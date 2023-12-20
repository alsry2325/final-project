import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callUpdateReadAtAPI } from "../../../apis/NoteApiCalls";

function NoteItem({ note }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { noteNo, senderPhoto, recipientPhoto, readAt, noteTitle, noteContent, senderName, senderDepartmentName, sentAt } = note;

    /* 상세조회 이동 */
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
        <div className="noteInfoBox" onClick={onClickNoteHandler}>
            <div className="noteInfolist">
                <div className="noteInfolistItem">{senderPhoto &&
                    <img src={senderPhoto} alt={"사원 이미지"}/>}</div>
                <div className="noteInfolistItem">{senderName}</div>
                <div className="noteInfolistItem">{senderDepartmentName}</div>
                <div className="noteInfolistItem">{displayTitle}</div>
                <div className="noteInfolistItem">{displayContent}</div>
                <div className="noteInfolistItem">{sentAt}</div>
            </div>
            <hr/>
        </div>
    );
}

export default NoteItem;
