import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ApproveModal from "../../modal/ApproveModal";
import {callAppPendingAPI} from "../../../apis/ApprovalAPICalls";

function ButtonForApprover({businessDraft, expenseReport}) {

    const {approvalCode} = useParams();
    const navigate = useNavigate();
    // const {appApprove} = useSelector((state) => (state).approvalReducer);
    const [approveModal, setApproveModal] = useState(false);
    const [approveOpinion, setApproveOpinion] = useState("");
    const dispatch = useDispatch();

    // useEffect((appApprove) => {
    //     if(appApprove === true) {
    //         navigate('/approve/receive-approvals/all')
    //         // 결재한 후에 어디로 가야할까,,
    //     }
    // }, [appApprove]);

    // 승인, 반려 버튼을 누르면 모달창 오픈
    const onClickApprove = () => {
        setApproveOpinion("승인")
        setApproveModal(true);
    }

    const onClickReturn = () => {
        setApproveOpinion("반려");
        setApproveModal(true);
    }

    const onClickPending = () => {
        const result = window.confirm('결재를 보류하시겠습니까?')
        if(result){
            dispatch(callAppPendingAPI({approvalCode}));
        }

    }

    return (
        <>
            {
                approveModal &&
                <ApproveModal
                    setApproveModal={setApproveModal}
                    businessDraft={businessDraft}
                    expenseReport={expenseReport}
                    OnApproveOpinion={approveOpinion}
                />
            }
            <div className="app-button-bar">
                <div
                    className="back-to-list"
                    onClick={() => navigate(-1)}
                >
                    <img
                        src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/329c3372-759b-4f25-9f81-b1a86200c2b1"
                        className="back-img"/>
                    목록으로
                </div>
                {/*받은 결재 조회 - 결재, 반려, 보류*/}
                <div className="approval-button-div">
                    <button
                        onClick={onClickApprove}
                        className="app-button app-blue-btn">승인</button>
                    <button
                        onClick={onClickReturn}
                        className="app-button">반려</button>
                    <button
                        onClick={onClickPending}
                        className="app-button">보류</button>
                </div>

            </div>
            <div className="line-div"/>
        </>
    );
}

export default ButtonForApprover;