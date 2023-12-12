import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    callAddressBookListAPI,
    callAddressBookSearchEmailAPI,
    callAddressBookSearchNameAPI, callAddressBookSearchPhoneAPI
} from "../../../apis/AddressBookApiCalls";
import PagingBar from "../../../components/common/PagingBar";
import {useNavigate} from "react-router-dom";
import AddressList from "../../../components/lists/AddressList";

function AddressBookMain() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const { address } = useSelector((state) => state.addressReducer);
    const [searchOption, setSearchOption] = useState('name');

    useEffect(() => {
        dispatch(callAddressBookListAPI({ currentPage }));
    }, [dispatch, currentPage]);

    const onSearchChangeHanlder = e => {
        setSearch(e.target.value);
    }

    const onSearchOptionChange = (e) => {
        setSearchOption(e.target.value);
    };


    const onClickHandler = () => {
        if (searchOption === 'name') {
            dispatch(callAddressBookSearchNameAPI({ emplyName: search }));
        } else if (searchOption === 'email') {
            dispatch(callAddressBookSearchEmailAPI({ emplyEmail: search }));
        } else if (searchOption === 'phoneNumber') {
            dispatch(callAddressBookSearchPhoneAPI({ emplyPhoneNumber: search }));
        }
    };


    return (
        <div className="addressBook-div">
            <div className="address-wrapper">
                <h1 className="addressBook-h1">주소록</h1>
            </div>
            <hr/>
            <div className="addressInfolist">
                <div className="addressInfolistHeader">이름</div>
                <div className="addressInfolistHeader">부서</div>
                <div className="addressInfolistHeader">개인 번호</div>
                <div className="addressInfolistHeader">이메일</div>
                <div className="addressInfolistHeader">사내 번호</div>
                <div className="addressInfolistHeader">직급</div>
                <div className="addressInfolistHeader">입사일</div>
            </div>
            <hr/>
                <>
                    {address
                        &&
                           <AddressList data = {address.data}/>
                    }
                </>
            <div className="search-box">
                <div className="address-search">
                    <select
                        className="address-select"
                        value={searchOption}
                        onChange={onSearchOptionChange}
                    >
                        <option value="name">이름</option>
                        <option value="email">이메일</option>
                        <option value="phoneNumber">개인 번호</option>
                    </select>
                    <input
                        className="address-input"
                        type="text"
                        placeholder="검색어를 입력하세요."
                        value={search}
                        onChange={onSearchChangeHanlder}
                    />
                </div>
                <button
                    className="searchButton"
                    onClick={onClickHandler}
                >
                    검색
                </button>
            </div>

            {address && (
                <div className="paging-bar-container">
                    <PagingBar pageInfo={address.pageInfo} setCurrentPage={setCurrentPage}/>
                </div>
            )}
        </div>
    );
}

export default AddressBookMain;
