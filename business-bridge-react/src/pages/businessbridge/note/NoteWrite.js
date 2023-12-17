import React, {useState} from "react";
import Modal from "react-modal";
import {callNoteRegistAPI} from "../../../apis/NoteApiCalls";
import {
    callAddressBookSearchNameAPI,
    callAddressBookSearchEmailAPI,
    callAddressBookSearchPhoneAPI
} from "../../../apis/AddressBookApiCalls";
import {useDispatch, useSelector} from 'react-redux';

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
        dispatch(callNoteRegistAPI({registRequest: noteData}));
    };

    /* 주소록 검색 모달 상태 */
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchType, setSearchType] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const addressData = useSelector(state => state.addressReducer.address);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const handleSearch = async () => {
        if (searchType === 'name') {
            await dispatch(callAddressBookSearchNameAPI({emplyName: searchQuery}));
        } else if (searchType === 'email') {
            await dispatch(callAddressBookSearchEmailAPI({emplyEmail: searchQuery}));
        } else if (searchType === 'phone') {
            await dispatch(callAddressBookSearchPhoneAPI({emplyPhoneNumber: searchQuery}));
        }
    };

    const handleSelectRecipient = (recipient) => {
        setNoteData({...noteData, recipient});
        setModalIsOpen(false);
    };


    return (
        <>
            <div className="note-div">
                <form onSubmit={handleSubmit}>
                    <div className="note-write-wrapper">
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
                                <button type="button"
                                        className="note-write-body"
                                        onClick={openModal}>주소록 검색
                                </button>
                                <textarea
                                    className="note-write-body"
                                    name="noteContent"
                                    value={noteData.noteContent}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="note-send-btn-container">
                        <button type="submit">쪽지 발송</button>
                    </div>
                </form>
            </div>

            {/* 주소록 검색 모달 */}
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>주소록 검색</h2>
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="name">이름</option>
                    <option value="email">이메일</option>
                    <option value="phone">핸드폰</option>
                </select>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button onClick={handleSearch}>검색</button>
                <ul>
                    {addressData && addressData.data && addressData.data.map((item, index) => (
                        <li key={index} onClick={() => handleSelectRecipient(item.emplyCode)}>
                            {item.emplyName} - {item.emplyEmail} - {item.emplyPhoneNumber}
                        </li>
                    ))}
                </ul>
            </Modal>

        </>
    );
}

export default NoteWrite;
