import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { callNoteRegistAPI } from "../../../apis/NoteApiCalls";

function NoteWrite() {
    const dispatch = useDispatch();
    const [noteData, setNoteData] = useState({
        noteTitle: '',
        recipient: '',
        noteContent: ''
    });

    const handleChange = (e) => {
        setNoteData({
            ...noteData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(callNoteRegistAPI({ registRequest: noteData }));
    };

    return (
        <>
            <div className="note-div">
                <form onSubmit={handleSubmit}>
                    <div className="note-write-body">
                        <div className="note-write-header-list">
                            <div className="note-write-header">쪽지 제목</div>
                            <div className="note-write-header">받는 사람</div>
                            <div className="note-write-header">쪽지 내용</div>
                        </div>
                        <div className="note-write-body-list">
                            <input
                                className="note-write-body"
                                type="text"
                                name="noteTitle"
                                value={noteData.noteTitle}
                                onChange={handleChange}
                            />
                            <input
                                className="note-write-body"
                                type="text"
                                name="recipient"
                                value={noteData.recipient}
                                onChange={handleChange}
                            />
                            <textarea
                                className="note-write-body"
                                name="noteContent"
                                value={noteData.noteContent}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">쪽지 보내기</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default NoteWrite;
