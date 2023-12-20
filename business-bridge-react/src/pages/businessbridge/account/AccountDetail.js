import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callAccountAPI, callAccountDeleteAPI } from "../../../apis/AccountAPICalls";

function AccountDetail() {
    
    console.log("거래처 상세페이지 진입")
    
    const { accountCode } = useParams();
    //디스패쳐에서 가져온 영업상세정보 값
    const { account } = useSelector(state => state.accountReducer);
    const { deleteSuccess} = useSelector(state => state.accountReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /*  최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(() => {
        dispatch(callAccountAPI({ accountCode }));
    }, []);

    useEffect(() => {
        //삭제시 개러처 메인으로 이동한다.
        if(deleteSuccess === true) {
            navigate('/account/accountList/0', { replace : true });
        }
    }, [deleteSuccess]);

    /* 개러채 삭제 요청하는 이벤트 */
    const handleConfirmation = () => {
        const result = window.confirm('정말로 삭제하시겠습니까?');
        if (result) {
          // 사용자가 확인을 선택한 경우
          dispatch(callAccountDeleteAPI({accountCode}));
        }
    }
    
    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            {   account &&
            <div className="sales-detail-container">
                <div className="sales-infos">
                    <div className="sales-detail-info">
                        <div className="sales-h2">
                            <h2>거래처관리 상세조회</h2>
                        </div>
                        <table>
                            <tbody>
                            <tr>
                                <td style={{backgroundColor: '#F1F0F6'}}><label>거래처명</label></td>
                                <td>{account.accountName}</td>
                                <td style={{backgroundColor: '#F1F0F6'}}><label>영업상품명</label></td>
                                <td>{account.productName}</td>
                                <td style={{backgroundColor: '#F1F0F6'}}><label>대표자</label></td>
                                <td>{account.customerRepresentative}</td>
                            </tr>
                            <tr>
                                <td style={{backgroundColor: '#F1F0F6'}}><label>거래처 담당자</label></td>
                                <td>{account.accountManager}</td>
                                <td style={{backgroundColor: '#F1F0F6'}}><label>거래처 연락처</label></td>
                                <td>{account.accountNumber}</td>
                                <td style={{backgroundColor: '#F1F0F6'}}><label>거래처 주소</label></td>
                                <td>{account.accountAddress}</td>
                            </tr>
                            <tr>
                                <td style={{backgroundColor: '#F1F0F6'}}><label>세금계산서 메일주소</label></td>
                                <td>{account.taxInvoiceMail}</td>
                                <td style={{backgroundColor: '#F1F0F6'}}><label>사업자등록번호</label></td>
                                <td colSpan='3'>{account.businessLicenseNumber}</td>
                            </tr>
                            <tr>
                                <td style={{backgroundColor: '#F1F0F6'}}><label>특이사항</label></td>
                                <td colSpan='5'>{account.specialNote}</td>
                            </tr>

                            </tbody>
                        </table>
                        <div className="sales-detail-buttons">
                            <button
                                className="sales-button"
                                onClick={() => navigate(-1)}
                            >
                                돌아가기
                            </button>
                            <button
                                className="sales-button"
                                onClick={() =>navigate(`/account/account-modify/${account.accountCode}`)}
                            >
                                수정하기
                            </button>
                            <button
                                className="sales-button"
                                onClick={handleConfirmation}
                            >
                                삭제하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default AccountDetail;
