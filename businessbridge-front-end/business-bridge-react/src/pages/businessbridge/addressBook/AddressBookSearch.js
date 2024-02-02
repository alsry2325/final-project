import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    callAddressBookSearchEmailAPI,
    callAddressBookSearchNameAPI,
    callAddressBookSearchPhoneAPI
} from "../../../apis/AddressBookApiCalls";
import PagingBar from "../../../components/common/PagingBar";
import AddressList from "../../../components/lists/AddressList";

function AddressBookSearch() {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchOption = searchParams.get('searchOption') || 'name';
    const search = searchParams.get('search') || '';
    const { addressList } = useSelector(state => state.addressReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (searchOption === 'name') {
            dispatch(callAddressBookSearchNameAPI({ emplyName: search, currentPage }));
        } else if (searchOption === 'email') {
            dispatch(callAddressBookSearchEmailAPI({ emplyEmail: search, currentPage }));
        } else if (searchOption === 'phoneNumber') {
            dispatch(callAddressBookSearchPhoneAPI({ emplyPhoneNumber: search, currentPage }));
        }
    }, [dispatch, searchOption, search, currentPage]);

    return (
        <div className="addressBook-div">
            <h1 className="addressBook-h1">주소록 검색</h1>
            {addressList && (
                <>
                    <AddressList data={addressList.data} />
                    <PagingBar pageInfo={addressList.pageInfo} setCurrentPage={setCurrentPage} />
                </>
            )}
        </div>
    );
}

export default AddressBookSearch;
