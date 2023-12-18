import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callAddressBookDepartmentAPI, callAddressBookListAPI} from "../../../apis/AddressBookApiCalls";
import PagingBar from "../../../components/common/PagingBar";
import AddressList from "../../../components/lists/AddressList";

function AddressBookDepartment() {

    const dispatch = useDispatch();
    const {departmentCode} = useParams();
    const {addressList} = useSelector(state => state.addressReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callAddressBookDepartmentAPI({departmentCode, currentPage}));
    }, [departmentCode, currentPage]);

    return (
        <>
            <div className="addressBook-div">
                <div className="address-wrapper">
                    <h1 className="addressBook-h1">부서 주소록</h1>
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
                    {addressList
                        &&
                        <AddressList data = {addressList.data}/>
                    }
                </>
            </div>
            {addressList && (
                <div className="paging-bar-container">
                    <PagingBar pageInfo={addressList.pageInfo} setCurrentPage={setCurrentPage}/>
                </div>
            )}
        </>
    );
}

export default AddressBookDepartment;
