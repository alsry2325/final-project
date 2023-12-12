import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callAddressBookDetailAPI} from "../../../apis/AddressBookApiCalls";
import AddressItem from "../../../components/items/AddressItem";

function AddressDetail() {

    const dispatch = useDispatch();
    const {emplyCode} = useParams();
    const { address } = useSelector(state => state.addressReducer);

    useEffect(() => {
        dispatch(callAddressBookDetailAPI({ emplyCode }));
    }, []);

    return (
        <>
            <div className="addressBook-info">
                <div className="addressBook-h1">
                    <h1>주소록 상세조회</h1>
                </div>
                <hr/>
                {
                    address &&
                        <div className ="address-detail-div">
                            <AddressItem address={address}/>
                        </div>
                }
            </div>
        </>
    )
}

export default AddressDetail;