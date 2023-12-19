import React, {useEffect, useState} from 'react';
import {modifyAddressAPI} from "../../apis/AddressBookApiCalls";
import {toast, ToastContainer} from "react-toastify";
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {putSuccess} from "../../modules/AddressModule";


function AddressAdminItem({address}) {
    const location = useLocation();
    const {addressData} = location.state;
    const dispatch = useDispatch();

    const [editedAddress, setEditedAddress] = useState({
        emplyPhoto : addressData?.emplyPhoto || '',
        emplyName: addressData?.emplyName || '',
        emplyOffice: addressData?.emplyOffice || '',
        emplyEmail: addressData?.emplyEmail || '',
        emplyPhoneNumber: addressData?.emplyPhoneNumber || '',
        emplyInternalNumber: addressData?.emplyInternalNumber || '',
        positionName: addressData?.positionName || '',
        departmentName: addressData?.departmentName || '',
        positionCode: addressData?.positionCode || '',
        departmentCode: addressData?.departmentCode || '',
    });


    /* 수정된 값 저장 */
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedAddress({
            ...editedAddress,
            [name]: value,
        });
    };

    /* 주소록 수정 */
    const handleModifyAddress = async () => {
        try {
            const {
                emplyPhoto,
                emplyName,
                emplyOffice,
                emplyEmail,
                emplyPhoneNumber,
                emplyInternalNumber,
                positionName,
                departmentName,
                positionCode,
                departmentCode
            } = editedAddress;
            const addressBookUpdateRequest = {
                emplyPhoto,
                emplyName,
                emplyOffice,
                emplyEmail,
                emplyPhoneNumber,
                emplyInternalNumber,
                positionName,
                departmentName,
                positionCode,
                departmentCode
            };

            await dispatch(modifyAddressAPI({
                emplyCode: addressData.emplyCode,
                addressBookUpdateRequest: editedAddress
            }));
            toast.info("주소록 수정이 완료되었습니다.");
        } catch (error) {
            console.error("주소록 수정에 실패했습니다", error);
            toast.error("주소록 수정에 실패했습니다.");
        }
    };


    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="adressBook-info">
                <div className="addressBook-h1">
                    <h1>주소록 수정</h1>
                </div>
                <hr/>
                <table className="address-information">
                    <thead>
                    <tr>
                        <th>
                            <img src={editedAddress?.emplyPhoto} alt="Employee"/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{backgroundColor: '#F1F0F6'}}>이름</td>
                        <td style={{backgroundColor: '#F1F0F6'}}>소속</td>
                        <td colSpan="2">
                            <input
                                type="text"
                                name="emplyOffice"
                                value={editedAddress.emplyOffice}
                                onChange={handleInputChange}
                            />
                        </td>
                        <td style={{backgroundColor: '#F1F0F6'}}>사내번호</td>
                        <td>
                            <input
                                type="text"
                                name="emplyInternalNumber"
                                value={editedAddress.emplyInternalNumber}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan='5'>
                            <input
                                type="text"
                                name="emplyName"
                                value={editedAddress.emplyName}
                                onChange={handleInputChange}
                            />
                        </td>
                        <td style={{backgroundColor: '#F1F0F6'}}>사번</td>
                        <td colSpan="2">{addressData?.emplyCode}</td>
                        <td style={{backgroundColor: '#F1F0F6'}}>개인번호</td>
                        <td>
                            <input
                                type="text"
                                name="emplyPhoneNumber"
                                value={editedAddress.emplyPhoneNumber}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{backgroundColor: '#F1F0F6'}}>이메일</td>
                        <td colSpan="2">
                            <input
                                type="text"
                                name="emplyEmail"
                                value={editedAddress.emplyEmail}
                                onChange={handleInputChange}
                            />
                        </td>
                        <td style={{backgroundColor: '#F1F0F6'}}>입사일</td>
                        <td>{addressData?.createdAt}</td>
                    </tr>
                    <tr>

                        <td style={{backgroundColor: '#F1F0F6'}}>직위/부서</td>
                        <td colSpan="2">{addressData?.positionName}/{addressData?.departmentName}</td>
                        <td style={{backgroundColor: '#F1F0F6'}}>퇴사일</td>
                        <td>{addressData?.retirementDate}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="address-btn-container">
                <button
                    className="address-modify-btn"
                    onClick={handleModifyAddress}
                >
                    수정완료
                </button>
            </div>

        </>
    );

}

export default AddressAdminItem;