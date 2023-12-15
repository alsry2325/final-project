import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    callNoteSenderListAPI,
    callNoteSenderSearchContentAPI,
    callNoteSenderSearchNameAPI,
    callNoteSenderSearchTitleAPI
} from "../../../apis/NoteApiCalls";
import PagingBar from "../../../components/common/PagingBar";
import {useNavigate} from "react-router-dom";
import NoteSenderList from "../../../components/lists/NoteSenderList";
import {ToastContainer} from "react-toastify";


function NoteSender() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const {notes} = useSelector(state => state.noteReducer);
    const [searchOption, setSearchOption] = useState('name');


    useEffect(() => {
        dispatch(callNoteSenderListAPI({currentPage}));
    }, [dispatch, currentPage]);

    const onSearchChangeHanlder = e => {
        setSearch(e.target.value);
    }

    const onSearchOptionChange = (e) => {
        setSearchOption(e.target.value);
    };


    const onClickNoteSearchHandler = () => {
        if (searchOption === 'name') {
            dispatch(callNoteSenderSearchNameAPI({emplyName: search}));
        } else if (searchOption === 'title') {
            dispatch(callNoteSenderSearchTitleAPI({noteTitle: search}));
        } else if (searchOption === 'content') {
            dispatch(callNoteSenderSearchContentAPI({noteContent: search}));
        }
    };


    return (
        <>
            <div className="note-div">
                <div className="note-wrapper">
                    <h1 className="note-h1">보낸 쪽지함</h1>
                </div>
                <hr/>
                <div className="noteList">
                    <div className="noteListHeader">받는사람</div>
                    <div className="noteListHeader">부서</div>
                    <div className="noteListHeader">제목</div>
                    <div className="noteListHeader">내용</div>
                    <div className="noteListHeader">읽은 날짜</div>
                </div>
                <hr/>
                <>
                    {notes
                        &&
                        <NoteSenderList data={notes.data}/>
                    }
                </>
                <div className="search-box">
                    <div className="note-search">
                        <select
                            className="note-select"
                            value={searchOption}
                            onChange={onSearchOptionChange}
                        >
                            <option value="name">받는사람</option>
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                        </select>
                        <input
                            className="note-input"
                            type="text"
                            placeholder="검색어를 입력하세요."
                            value={search}
                            onChange={onSearchChangeHanlder}
                        />
                    </div>
                    <button
                        className="searchButton"
                        onClick={onClickNoteSearchHandler}
                    >
                        검색
                    </button>
                </div>

                {notes && (
                    <div className="paging-bar-container">
                        <PagingBar pageInfo={notes.pageInfo} setCurrentPage={setCurrentPage}/>
                    </div>
                )}
            </div>
        </>
    );
}

export default NoteSender;
