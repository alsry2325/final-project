//영업 상세조회
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callSalesAPI,callProgressRegistAPI, callSalesDeleteAPI } from "../../../apis/SalesAPICalls";
import ProgressModal from "../../../components/modal/ProgressModal";



function SalesDetail() {

    console.log("영업 상세페이지 진입")
    const [progressModal, setProgressModal] = useState(false);
    const [form, setForm] = useState({});
    const [refreshProgressModal, setRefreshProgressModal] = useState(false);
    const { salesCode } = useParams();
    //디스패쳐에서 가져온 영업상세정보 값
    const { sales } = useSelector(state => state.salesReducer);
    const { postSuccess, deleteSuccess} = useSelector(state => state.salesReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /*  최초 랜더링 시 영업 상세 정보 조회 */
    useEffect(() => {
        dispatch(callSalesAPI({ salesCode }));
    }, []);


    useEffect(() => {
        //삭제시 영업 메인으로 이동한다.
        if(deleteSuccess === true) {
            navigate('/sales/salesList/0', { replace : true });
        }
    }, [deleteSuccess]);



    /* 영업 삭제 요청하는 이벤트 */
    const handleConfirmation = () => {
        const result = window.confirm('정말로 삭제하시겠습니까?');
        if (result) {
            // 사용자가 확인을 선택한 경우!
            dispatch(callSalesDeleteAPI({salesCode}));
        }
    }

    /* 진행내역보기 모달창 오픈 */
    const onClickProgressHandler = () => {
        setProgressModal(true);
        setRefreshProgressModal(false); // 새로 고침 플래그를 초기화
    };

    return (
        <>
            {
                progressModal &&
                <ProgressModal
                    setProgressModal={setProgressModal}
                    salesCode = {salesCode}
                    refreshProgressModal={refreshProgressModal}
                    setRefreshProgressModal={setRefreshProgressModal}
                />
            }
            {   sales &&
                <div className="sales-detail-container">
                    <button
                        className="sales-button"
                        onClick={() =>
                            onClickProgressHandler()
                        }
                    >
                        진행내역보기
                    </button>
                    <div className="sales-infos">
                        <div className="sales-detail-info">
                            <div className="sales-h2">
                                <h2>영업관리 상세조회</h2>
                            </div>
                            <table>
                                <tbody>
                                <tr>
                                    <td style={{backgroundColor: '#F1F0F6'}}>영업상태</td>
                                    <td>{sales.salesStatus}</td>
                                    <td style={{backgroundColor: '#F1F0F6'}}>영업형태</td>
                                    <td>{sales.salesType}</td>
                                    <td style={{backgroundColor: '#F1F0F6'}}>영업유형</td>
                                    <td>{sales.salesWay}</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor: '#F1F0F6'}}>영업담당자</td>
                                    <td>{sales.salesMember}</td>
                                    <td style={{backgroundColor: '#F1F0F6'}}>영업등급</td>
                                    <td>{sales.customerRating}</td>
                                    <td style={{backgroundColor: '#F1F0F6'}}>부서명</td>
                                    <td>{sales.departmentName}</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor: '#F1F0F6'}}>거래처명</td>
                                    <td>{sales.accountName}</td>
                                    <td style={{backgroundColor: '#F1F0F6'}}>상품명</td>
                                    <td colSpan='3'>{sales.productName}</td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor: '#F1F0F6'}}>영업내용</td>
                                    <td colSpan='5'>{sales.salesName}</td>
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
                                    onClick={() =>navigate(`/sales/sales-modify/${sales.salesCode}`)}
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

export default SalesDetail;
