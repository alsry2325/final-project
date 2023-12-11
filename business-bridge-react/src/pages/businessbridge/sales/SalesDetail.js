import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callSalesAPI,callProgressRegistAPI, callSalesDeleteAPI } from "../../../apis/SalesAPICalls";


function SalesDetail() {
    
    console.log("영업 상세페이지 진입")
    
    const [form, setForm] = useState({});
    const { salesCode } = useParams();
    //디스패쳐에서 가져온 영업상세정보 값
    const { sales } = useSelector(state => state.salesReducer);
    const { postSuccess, deleteSuccess} = useSelector(state => state.salesReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /*  최초 랜더링 시 상품 상세 정보 조회 */
    useEffect(() => {
        dispatch(callSalesAPI({ salesCode }));
    }, []);

    /* 진행내역 저장 성공*/
    useEffect(() => {
        if(postSuccess === true) {
            //저장 성공후 재조회
            dispatch(callSalesAPI({ salesCode }));
            //navigate('/sales-management', { replace : true });
        }
    }, [postSuccess]);

    useEffect(() => {
        //삭제시 영업 메인으로 이동한다.
        if(deleteSuccess === true) {
            navigate('/sales/salesList/1', { replace : true });
        }
    }, [deleteSuccess]);

    
    /* 입력 양식 값 변경 시 state 수정 */
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    /* 진행내역 저장 버튼 클릭 시 이벤트 */
    const onClickProgressRegistrationHandler = () => {
        /* 서버로 전달한 FormData 형태의 객체 설정 */
        form['salesCode'] = salesCode;
        dispatch(callProgressRegistAPI({registRequest : form }));
    }
    

    /* 영업 삭제 요청하는 이벤트 */
    const handleConfirmation = () => {
        const result = window.confirm('정말로 삭제하시겠습니까?');
        if (result) {
          // 사용자가 확인을 선택한 경우!
          dispatch(callSalesDeleteAPI({salesCode}));
        }
    }

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            {   sales &&
            <div className="sales-detail-container">
                <div>
                    <button
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                    돌아가기
                    </button>
                    <button
                        className="modify-btn"
                        onClick={() =>navigate(`/sales/sales-modify/${sales.salesCode}`)}
                    >
                    수정하기
                    </button>
                    <button
                    className="delete-btn"
                    onClick={handleConfirmation}
                    >
                    삭제하기
                </button>
                </div>
                  <div className="sales-infos">
                    <div className="sales-detail-info">
                        <table>
                            <tbody>
                            <tr>
                                <td><label>영업상태</label></td>
                                <td>{sales.salesStatus}
                                </td>
                            </tr>
                            <tr>
                                <td><label>영업형태</label></td>
                                <td>{sales.salesType}</td>
                            </tr>
                            <tr>
                                <td><label>거래처명</label></td>
                                <td>{sales.accountName}</td>
                            </tr>
                            <tr>
                                <td><label>영업담당</label></td>
                                <td>{sales.salesMember}</td>
                            </tr>
                            <tr>
                                <td><label>Grade</label></td>
                                <td>{sales.customerRating}
                                </td>
                            </tr>
                            <tr>
                                <td><label>영업유형</label></td>
                                <td>{sales.salesWay}</td>
                            </tr>
                            <tr>
                                <td><label>부서명</label></td>
                                <td>{sales.departmentName}</td>
                            </tr>
                            <tr>
                                <td><label>상품 명</label></td>
                                <td>{sales.productName}</td>
                            </tr>
                            <tr>
                                <td><label>영업 이름</label></td>
                                <td>{sales.salesName}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                <div className="form-groups">
                    <div className="form-group">
                        <label htmlFor="latestDateConsultation">최근 상담일</label>
                        <input type='date'
                               className='aa'
                            id="latestDateConsultation"
                            name="latestDateConsultation"
                            onChange={ onChangeHandler }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nextDayConsultation">다음 상담일</label>
                        <input type='date'
                            id="nextDayConsultation"
                            name="nextDayConsultation"
                            onChange={ onChangeHandler }
                        />
                    </div>
                    <div
                        className="form-group">
                        <label htmlFor="state">진행 내용</label>
                        <textarea
                            className="state-area"
                            id="state"
                            name="state"
                            onChange={ onChangeHandler }
                        />
                    </div>
                    <button
                    onClick={ onClickProgressRegistrationHandler }
                >
                    진행내역 저장
                </button>
                    {sales.progressList.map(progress => (
                        <div key={progress.progressCode} className="sales-detail-progress">
                            <div className="progress-form">
                                <div className="form-group">
                                    <span>최근 상담일 : {progress.latestDateConsultation}</span>
                                </div>
                                <div className="form-group">
                                    <span>다음 상담일 : {progress.nextDayConsultation}</span>
                                </div>
                                <div className="form-group">
                                    <span>진행내용 : {progress.state}</span>
                                </div><hr/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
            }
        </>
    );
}

export default SalesDetail;
