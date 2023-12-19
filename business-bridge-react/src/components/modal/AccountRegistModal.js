import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callAccountRegistAPI} from "../../apis/AccountAPICalls";
import SalesProductModal from "./SalesProductModal";
import SalesRegistModal from "./SalesRegistModal";

function AccountRegistModal({setIsOpen}){
    const [salesProductModal, setSalesProductModal] = useState(false);
    const navigate = useNavigate()
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const { postSuccess } = useSelector(state => state.accountReducer);

    useEffect(() => {
        //등록시 커래처 메인으로 이동함
        if(postSuccess === true) {
            setIsOpen(false);
            navigate('/account/accountList/0', { replace : true });
        }
    }, [postSuccess, setIsOpen]);

    /* 상품검색 모달창 오픈 */
    const onClickSalesProductHandler = () => {
        setSalesProductModal(true);
    };

    // 모달창 콜백 함수 정의
    const handleSelectProduct = ({ productCode, productName }) => {
        // 선택된 상품 정보를 처리
        console.log("Selected Product Code:", productCode);
        console.log("Selected Product Name:", productName);
        setForm({
            ...form,
            productCode,
            productName
        });
    };

    /* 입력 양식 값 변경 시 state 수정 */
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    /* 영업 등록 버튼 클릭 시 이벤트 */
    const onClickAccountRegistrationHandler = () => {

        if(document.getElementById('accountName').value === ""){
            alert("거래처명을 입력하세요.");
            document.getElementById('accountName').focus();
            return false;
        }
        if(document.getElementById('productName').value === ""){
            alert("거래처상품을 선택하세요.");
            document.getElementById('productName').focus();
            return false;
        }
        if(document.getElementById('businessLicenseNumber').value === ""){
            alert("사업자번호를 입력하세요.");
            document.getElementById('businessLicenseNumber').focus();
            return false;
        }
        if(document.getElementById('accountManager').value === ""){
            alert("거래처담당자를 입력하세요.");
            document.getElementById('accountManager').focus();
            return false;
        }
        if(document.getElementById('accountAddress').value === ""){
            alert("거래처주소를 입력하세요.");
            document.getElementById('accountAddress').focus();
            return false;
        }
        if(document.getElementById('taxInvoiceMail').value === ""){
            alert("세금계산서 메일주소를 입력하세요.");
            document.getElementById('taxInvoiceMail').focus();
            return false;
        }
        if(document.getElementById('customerRepresentative').value === ""){
            alert("대표자 이름을 입력하세요.");
            document.getElementById('customerRepresentative').focus();
            return false;
        }
        dispatch(callAccountRegistAPI({registRequest : form }));
    }

    return (
        <>
            {
                salesProductModal &&
                <SalesProductModal
                    setSalesProductModal={setSalesProductModal}
                    onSelectProduct={handleSelectProduct}
                />
            }
            <div>

        <div className="modal-overlay">
            <div className="modal-content">
                <div className="sales-regist-section">
                    <div className="sales-regist-info-div">
                        <table className="sales-regist-table">
                            <tbody>
                            <tr>
                                <th className="sales-registModal-table"
                                    colSpan="2">거래처등록
                                </th>
                            </tr>
                            <tr>
                                <td><label>거래처명</label></td>
                                <td>
                                    <input
                                        placeholder='거래처명'
                                        name='accountName'
                                        id='accountName'
                                        className="sales-input"
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>상품 명</label></td>
                                <td>
                                    <input
                                        className="sales-input"
                                        placeholder='상품명'
                                        name='productName' id='productName'
                                        onChange={ onChangeHandler }
                                        readOnly={true}
                                        value={form.productName || ""}
                                    />
                                    <button
                                        className="sales-button"
                                        onClick={() =>
                                            onClickSalesProductHandler()
                                        }
                                    >
                                        상품등록
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><label>사업자번호</label></td>
                                <td>
                                    <input
                                        placeholder='사업자번호'
                                        name='businessLicenseNumber'
                                        id='businessLicenseNumber'
                                        className="sales-input"
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>거래처 담당자</label></td>
                                <td>
                                    <input
                                        className="sales-input"
                                        name='accountManager'
                                        id='accountManager'
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>거래처 연락처</label></td>
                                <td>
                                    <input
                                        className="sales-input"
                                        placeholder='거래처 연락처'
                                        name='accountNumber'
                                        id='accountNumber'
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>거래처 주소</label></td>
                                <td>
                                    <input
                                        className="sales-input"
                                        placeholder='거래처 주소'
                                        name='accountAddress'
                                        id='accountAddress'
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>세금계산서 이메일</label></td>
                                <td>
                                    <input
                                        className="sales-input"
                                        placeholder='세금계산서 이메일 주소'
                                        name='taxInvoiceMail'
                                        id='taxInvoiceMail'
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>대표자</label></td>
                                <td>
                                    <input
                                        className="sales-input"
                                        placeholder='대표자'
                                        name='customerRepresentative'
                                        id='customerRepresentative'
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>특이사항</label></td>
                                <td>
                                <textarea
                                    className="textarea-style"
                                    name='specialNote'
                                    id='specialNote'
                                    onChange={ onChangeHandler }
                                ></textarea>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="sales-buttons">
                            <button
                                className="sales-button"
                                onClick={ () => setIsOpen(false) } // navigate 주소 뿐만 아니라 (히스토리)숫자도 줄 수 있다.
                            >
                                돌아가기
                            </button>
                            <button
                                className="sales-button"
                                onClick={ onClickAccountRegistrationHandler }
                            >
                                거래처 등록
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    );
}

export default AccountRegistModal;