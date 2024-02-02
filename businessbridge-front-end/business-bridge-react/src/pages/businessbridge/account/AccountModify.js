import SalesProductModal from "../../../components/modal/SalesProductModal";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callAccountAPI, callAccountModifyAPI} from "../../../apis/AccountAPICalls";

function AccountModify () {

    const [salesProductModal, setSalesProductModal] = useState(false);
    const { accountCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    /* 읽기 모드와 수정 모드를 전환 하는 state */
    const [form, setForm] = useState({});
    const [prevForm, setPrevForm] = useState({});
    const { account, putSuccess } = useSelector(state => state.accountReducer);
    
    useEffect(() => {
        setForm({...account});
    }, [account]);

    /*  최초 랜더링 시 영업 상세 정보 조회 */
    useEffect(() => {
        dispatch(callAccountAPI({accountCode}));
    }, []);

    /* 수정 성공 시 영업 메인화면 이동 */
    useEffect(() => {
        if(putSuccess === true) {
            navigate('/account/accountList/0', { replace : true })
        }
    }, [putSuccess]);

    /* 상품검색 모달창 오픈 */
    const onClickSalesProductHandler = () => {
        setPrevForm({...form});
        setSalesProductModal(true);
    };

    /* 입력 양식 값 변경 시 state 수정 */
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    // 모달창 콜백 함수정의
    const handleSelectProduct = ({productCode, productName}) => {
        // 선택된 상품 정보를 처리
        console.log("Selected Product Code:", productCode);
        console.log("Selected Product Name:", productName);
        setForm({
            ...prevForm,
            productCode,
            productName
        });
    };

    /* 영업 수정 요청하는 이벤트 */
    const onClickAccountUpdateHandler = () => {

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

        
        dispatch(callAccountModifyAPI({accountCode, modifyRequest : form}));

    }

    return (
        <>
        {
            salesProductModal &&
            <SalesProductModal
                setSalesProductModal={setSalesProductModal}
                onSelectProduct={handleSelectProduct}
                account = {account}
            />
        }
        <div className="sales-detail-container">
            <div className="sales-infos">
                <input type="hidden" name="productCode" id="productCode" onChange={ onChangeHandler } value={form.productCode || ''}/>
                <div className="sales-detail-info">
                    <div className="sales-h2">
                        <h2>거래처관리 수정</h2>
                    </div>
                <table>
                        <tbody>
                        <tr>
                            <td style={{backgroundColor: '#F1F0F6'}}>거래처명</td>
                            <td>
                            <input
                                    placeholder='거래처명'
                                    name='accountName'
                                    id='accountName'
                                    className="sales-input"
                                    onChange={ onChangeHandler }
                                    value={form.accountName || ''}
                            />
                            </td>
                            <td style={{backgroundColor: '#F1F0F6'}}>영업상품명</td>
                            <td>
                                <input
                                    placeholder='상품명'
                                    className="sales-input"
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
                                    상품검색
                                </button>
                            </td>
                            <td style={{backgroundColor: '#F1F0F6'}}>대표자</td>
                            <td>
                                <input
                                    placeholder='대표자'
                                    className="sales-input"
                                    name='customerRepresentative'
                                    id='customerRepresentative'
                                    onChange={ onChangeHandler }
                                    value={form.customerRepresentative || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{backgroundColor: '#F1F0F6'}}>거래처 담당자</td>
                            <td>
                                <input
                                    className="sales-input"
                                    name='accountManager'
                                    id='accountManager'
                                    onChange={ onChangeHandler }
                                    value={form.accountManager || ''}
                                />
                            </td>
                            <td style={{backgroundColor: '#F1F0F6'}}>거래처 연락처</td>
                            <td>
                                <input
                                    className="sales-input"
                                    placeholder='거래처 연락처'
                                    name='accountNumber'
                                    id='accountNumber'
                                    onChange={ onChangeHandler }
                                    value={form.accountNumber || ''}
                                />
                            </td>
                            <td style={{backgroundColor: '#F1F0F6'}}>거래처 주소</td>
                            <td>
                                <input
                                    className="sales-input"
                                    placeholder='거래처 주소'
                                    name='accountAddress'
                                    id='accountAddress'
                                    onChange={ onChangeHandler }
                                    value={form.accountAddress || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{backgroundColor: '#F1F0F6'}}>세금계산서 메일주소</td>
                            <td>
                                <input
                                    className="sales-input"
                                    placeholder='거래처 연락처'
                                    name='taxInvoiceMail'
                                    id='taxInvoiceMail'
                                    onChange={ onChangeHandler }
                                    value={form.taxInvoiceMail || ''}
                                />
                            </td>
                            <td style={{backgroundColor: '#F1F0F6'}}>사업자번호</td>
                            <td colSpan='3'>
                            <input
                                className="sales-input"
                                    placeholder='사업자번호'
                                    name='businessLicenseNumber'
                                    id='businessLicenseNumber'
                                    className="product-info-input"
                                    onChange={ onChangeHandler }
                                    value={form.businessLicenseNumber || ''}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td style={{backgroundColor: '#F1F0F6'}}>특이사항</td>
                            <td td colSpan='5'>
                                <textarea
                                    className="textarea-style"
                                    name='specialNote'
                                    id='specialNote'
                                    onChange={ onChangeHandler }
                                    value={form.specialNote || ''}
                                >
                                </textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="sales-detail-buttons">
                        <button
                            className='sales-button'
                            onClick={ () => navigate(-1) }
                        >
                            돌아가기
                        </button>
                        <button
                            className='sales-button'
                            onClick={ onClickAccountUpdateHandler }
                        >
                            수정하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AccountModify;