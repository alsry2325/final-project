import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {callApproveAppAPI} from "../../apis/ApprovalAPICalls";
import {toast, ToastContainer} from "react-toastify";

function ApproveModal({setApproveModal, businessDraft, expenseReport, OnApproveOpinion}) {

    const {approvalCode} = useParams();
    const [opinion, setOpinion] = useState({approvalCode});
    const {appApprove} = useSelector(state => state.approvalReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(appApprove === true) {
            // navigate(-1)
            navigate('/approval/receive-approvals/all')
        }
    }, [appApprove]);

    const onChangeHandler = e => {
        setOpinion({
            ...opinion,
            [e.target.name] : e.target.value
        });
        // console.log("e.target.value : ", e.target.value)
    }

    console.log("opinion.approvalOpinion : ", opinion.approvalOpinion)



    // 결재 클릭 시 폼 저장 후 모달 닫기
    const onClickApproveHandler = () => {

        dispatch(callApproveAppAPI({approvalCode, approvalStatus : OnApproveOpinion, approvalOpinion : opinion.approvalOpinion}));
        setApproveModal(false);
        navigate(-1);
    }


    return (
        <>
        <ToastContainer/>
        <div className="modal">
            <div className="approve-modal-container">
                <div className="approve-modal-div">

                    <h3 className="approve-modal-title"> 결재하기 </h3>

                    <div className="approve-modal-body">
                        <div className="approve-title-div">
                            <span className="approve-left">결재 문서명</span>
                            <div className="view-title">
                                {(businessDraft && businessDraft.title) ||
                                    (expenseReport && expenseReport.title)}
                            </div>
                        </div>

                        <div className="approve-opinion-div">

                            <span className="approve-left">결재 의견</span>
                            <input
                                type="text"
                                className="approvalOpinion"
                                name='approvalOpinion'
                                placeholder="결재 첨언을 입력해주세요."
                                onChange={onChangeHandler}
                                />
                        </div>
                    </div>

                    <div className="modal-button">
                        <button
                            onClick={ onClickApproveHandler}
                            className="approve-button app-blue-btn"
                        >결재</button>
                        <button
                            className="approve-button"
                            onClick={() => setApproveModal(false)}
                        >취소</button>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default ApproveModal;