import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {callEmployeeAPI} from "../../../apis/EmployeeAPICalls";
import {useDispatch, useSelector} from "react-redux";
import {is} from "date-fns/locale";

function ApprovalButton({businessDraft, expenseReport}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    return(
        <>
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
                    <button className="app-button app-blue-btn">결재</button>
                    <button className="app-button">반려</button>
                    <button className="app-button">보류</button>
                </div>

                {/*기안문서함 - 회수*/
                    // ((isDrafter && businessDraft.approvalOpinion == null)  ||
                    // (isDrafter && expenseReport.approvalOpinion == null)) &&
                    <div className="approval-button-div">
                        <button className="app-button">회수</button>
                    </div>
                }

                {
                    // ((isDrafter && businessDraft.draftDateTime == null) ||
                    // (isDrafter && expenseReport.draftDateTime == null)) &&
                    <div className="approval-button-div">
                        <button className="app-button">임시저장</button>
                        <button className="app-button app-blue-btn">결재요청</button>
                        <button className="app-button">취소</button>
                    </div>
                }
            </div>
            <div className="line-div"></div>
        </>
    );
}

export default ApprovalButton;