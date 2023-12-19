import React, {useState} from "react";
import Modal from "react-modal";
import {callModifyStatusStorageAPI, callNoteRegistAPI} from "../../../apis/NoteApiCalls";
import {
    callAddressBookSearchNameAPI,
    callAddressBookSearchEmailAPI,
    callAddressBookSearchPhoneAPI
} from "../../../apis/AddressBookApiCalls";
import {useDispatch, useSelector} from 'react-redux';
import AddressBookModal from "../../../components/items/AddressBookModal";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

function NoteWrite() {
    const dispatch = useDispatch();
    const [noteData, setNoteData] = useState({
        noteTitle: '',
        recipient: '',
        noteContent: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNoteData({
            ...noteData,
            [e.target.name]: e.target.value
        });
    };

    /* 주소록 검색 모달 상태 */
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchType, setSearchType] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const addressData = useSelector(state => state.addressReducer.addressList);
    const [selectedEmployeeName, setSelectedEmployeeName] = useState('');

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

    const handleSelectRecipient = (recipient, employeeName,) => {
        setNoteData({...noteData, recipient});
        /* 선택된 사원 이름으로 업데이트 한다. */
        setSelectedEmployeeName(employeeName);
        setModalIsOpen(false);
    };

    /* 바이트 크기 계산 */
    const [byteSize, setByteSize] = useState(0);
    const [textareaByteSize, setTextareaByteSize] = useState(0);

    function getUTF8ByteSize(str) {
        const encodedStr = encodeURIComponent(str);
        let size = 0;
        for (let i = 0; i < encodedStr.length; i++) {
            if (encodedStr[i] === '%') {
                size += 3; // 한글 = 3byte
                i += 2;
            } else {
                size += 1; // 나머지 ASCII 문자 = 1byte
            }
        }
        return size;
    }

    /* input 바이트 계산 */
    const handleInputByteSizeChange = (e) => {
        const inputText = e.target.value;
        const size = getUTF8ByteSize(inputText);

        if (size > 200) {
            e.preventDefault(); // 바이트 크기가 200을 초과하면 입력을 중단
            return;
        }

        setByteSize(size);
        handleChange(e);
    };

    /* textarea 바이트 계산 */
    const handleTextareaByteSizeChange = (e) => {
        const inputText = e.target.value;
        const size = getUTF8ByteSize(inputText);

        if (size > 1500) {
            e.preventDefault();
            return;
        }

        setTextareaByteSize(size);
        handleChange(e);
    };

    /* 쪽지 발송 버튼 */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(callNoteRegistAPI({registRequest: noteData}));
            toast.success('쪽지를 발송했습니다.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                onClose: () => navigate('/note/sender')
            });
        } catch (error) {
            toast.info('쪽지 발송에 실패했습니다.');
        }
    };

    return (
        <>
            <ToastContainer/>
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
                                        onChange={handleInputByteSizeChange}
                                    />
                                <div className="note-input-byte">{byteSize}/200 byte</div>

                                <div className="note-write-body">
                                    {selectedEmployeeName &&
                                        <div className="selectEmplyName">{selectedEmployeeName}</div>}
                                    <button type="button"
                                            className={`note-write-body ${selectedEmployeeName ? "buttonWithSelectedName" : ""}`}
                                            onClick={openModal}>주소록 검색
                                    </button>
                                </div>

                                <textarea
                                    className="note-write-body"
                                    name="noteContent"
                                    value={noteData.noteContent}
                                    onChange={handleChange}
                                    onChange={handleTextareaByteSizeChange}
                                />
                                <div className="note-input-byte">
                                    {textareaByteSize}/1500 byte
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="note-send-btn-container">
                        <button type="submit"
                        onClick={handleSubmit}>쪽지 발송</button>
                    </div>
                </form>
            </div>

            <AddressBookModal
                handleSelectRecipient={(recipientCode) => handleSelectRecipient(recipientCode, /* 선택된 사원 이름 */)}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                searchType={searchType}
                setSearchType={setSearchType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                addressData={addressData}
                handleSelectRecipient={handleSelectRecipient}
            />
        </>
    );
}

export default NoteWrite;
