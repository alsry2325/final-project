import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {callSalesAPI, callProgressRegistAPI} from "../../apis/SalesAPICalls";
import {useNavigate} from "react-router-dom";

function ProgressModal({setProgressModal, salesCode, refreshProgressModal, setRefreshProgressModal}) {

    setRefreshProgressModal(false);

    console.log("ProgressModal > 부모창에서 받은 slaes 객체");
    console.log(salesCode);
    console.log("모달 상세페이지");
    console.log("refreshProgressModal : "+refreshProgressModal);

    const { sales, postSuccess} = useSelector(state => state.salesReducer);
    const [form, setForm] = useState({});
    const dispatch = useDispatch();


    /*  최초 랜더링 시 영업 상세 정보 조회 */
    useEffect(() => {
        dispatch(callSalesAPI({ salesCode }));
    }, [refreshProgressModal]); //refreshProgressModal이 변경될 때마다 모달을 새로 고침

    /* 입력 양식 값 변경 시 state 수정 */
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const onClickClose = e => {
        setProgressModal(false);
        setRefreshProgressModal(false); // 새로 고침 플래그 초기화
    }

    /* 진행내역 저장 성공*/
    useEffect(() => {
        if(postSuccess === true) {
            setRefreshProgressModal(true); // 모달을 부모 컴포넌트에서 갱신하도록 플래그 설정
            //navigate(`/sales/${salesCode}`, { replace : true })
        }
    }, [postSuccess]);

    /* 진행내역 저장 버튼 클릭 시 이벤트 */
    const onClickProgressRegistrationHandler = () => {
        /* 서버로 전달한 FormData 형태의 객체 설정 */
        form['salesCode'] = salesCode;

        if(document.getElementById('latestDateConsultation').value == ""){
            alert("최근 상담 일자를 선택해주세요.");
            document.getElementById('latestDateConsultation').focus();
            return false;
        }
        if(document.getElementById('nextDayConsultation').value == ""){
            alert("다음 상담 일자를 선택해주세요.");
            document.getElementById('nextDayConsultation').focus();
            return false;
        }
        if(document.getElementById('state').value == ""){
            alert("진행내역을 입력해주세요.");
            document.getElementById('state').focus();
            return false;
        }
        dispatch(callProgressRegistAPI({registRequest : form }));
    }
    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            {
                sales &&
                <>
                    <div className="modal">
                        <div className="modal-container">
                            <div className="progress-modal-div">
                                <h2 className='sales-h2'>진행내역</h2>
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
                                        className="sales-button"
                                        onClick={ onClickProgressRegistrationHandler }
                                    >
                                        진행내역 저장
                                    </button>
                                </div>
                                <div className="sales-div">
                                    {sales.progressList.length === 0 && (
                                        <span>진행내역이 없습니다.</span>
                                    )}
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
                                                    <span
                                                    >진행내용 : {progress.state}</span>
                                                </div><hr/>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="sales-progress-button"
                                    onClick={ onClickClose }
                                >
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default ProgressModal;
