import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {callAddressBookDetailAPI} from "../../../apis/AddressBookApiCalls";
import {deleteAddressAPI} from "../../../apis/AddressBookApiCalls";
import AddressItem from "../../../components/items/AddressItem";
import {isAdmin} from "../../../utils/TokenUtils";
import {toast, ToastContainer} from "react-toastify";

function AddressDetail() {

    const dispatch = useDispatch();
    const {emplyCode} = useParams();
    const {address} = useSelector(state => state.addressReducer);
    const navigate = useNavigate();
    const { deleteSuccess } = useSelector(state => state.addressReducer);

    useEffect(() => {
        dispatch(callAddressBookDetailAPI({emplyCode}));
    }, []);

    const handleModifyClick = () => {
        navigate(`/addressBook/addressAdmin/${emplyCode}`, { state: { addressData: address } });
    };

    const onDeleteClick = () => {
        // 토스트 메시지 먼저 표시
        toast.info("주소록 삭제에 성공하였습니다.", {
            autoClose: 1000,
            onClose: () => {
                /* 토스트 메시지가 닫힌 후 삭제 요청을 보냄 */
                dispatch(deleteAddressAPI({ emplyCode }))
                    .then((response) => {
                        console.log("주소록 삭제에 성공했습니다.");
                        navigate('/addressBook/main', { replace: true });
                    })
                    .catch((error) => {
                        console.error("주소록 삭제에 실패했습니다", error);
                        toast.error("주소록 삭제에 실패 하였습니다.", {
                            autoClose: 5000
                        });
                    });
            }
        });
    };

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>

            <div className="addressBook-info">
                <div className="addressBook-h1">
                    <h1>주소록 상세조회</h1>
                </div>
                <hr/>
                {       address &&
                        <div className="address-detail-div">
                            <AddressItem address={address} />
                        </div>
                }

                {
                    isAdmin() && (
                        <div className="address-btn-container">
                            <button className="address-modify-btn" onClick={handleModifyClick}>
                                수정하기
                            </button>
                            <button className="address-delete-btn" onClick={onDeleteClick}>삭제하기</button>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default AddressDetail;