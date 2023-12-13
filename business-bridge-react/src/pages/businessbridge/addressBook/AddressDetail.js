import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callAddressBookDetailAPI} from "../../../apis/AddressBookApiCalls";
import {deleteAddressAPI} from "../../../apis/AddressBookApiCalls";
import AddressItem from "../../../components/items/AddressItem";
import {isAdmin} from "../../../utils/TokenUtils";

function AddressDetail() {

    const dispatch = useDispatch();
    const {emplyCode} = useParams();
    const {address} = useSelector(state => state.addressReducer);

    useEffect(() => {
        dispatch(callAddressBookDetailAPI({emplyCode}));
    }, []);

    const navigate = useNavigate();

    const onDeleteClick = () => {
        dispatch(deleteAddressAPI({ emplyCode }))
            .then((response) => {
                console.log("주소록 삭제에 성공했습니다.")
            })
            .catch((error) => {
                console.error("주소록 삭제에 실패했습니다", error)
            });
    };


    return (
        <>
            <div className="addressBook-info">
                <div className="addressBook-h1">
                    <h1>주소록 상세조회</h1>
                </div>
                <hr/>
                {
                    address &&
                    <div className="address-detail-div">
                        <AddressItem address={address}/>
                    </div>
                }
            </div>
            {isAdmin() && (
                <div className="address-btn-container">
                    <button className="address-modify-btn"

                    >수정하기</button>
                    <button className="address-delete-btn"
                    onClick={ onDeleteClick }
                    >삭제하기</button>
                </div>
            )}
        </>
    )
}

export default AddressDetail;