import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callBusinessDraftDetailAPI, callExpenseReportDetailAPI} from "../../../apis/ApprovalAPICalls";
import {useNavigate, useParams} from "react-router-dom";
import BusinessDraftItem from "../../../components/items/approvalItems/BusinessDraftItem";
import ExpenseReportItem from "../../../components/items/approvalItems/ExpenseReportItem";
import {callEmployeeAPI} from "../../../apis/EmployeeAPICalls";
import ButtonForApprover from "../../../components/items/approvalItems/ButtonForApprover";
import ButtonForCollect from "../../../components/items/approvalItems/ButtonForCollect";
import memberReducer from "../../../modules/EmployeeModule";

function AppDetail() {

    const dispatch = useDispatch();
    const {approvalCode} = useParams();
    const {businessDraft} = useSelector(state => state.approvalReducer);
    const {expenseReport} = useSelector(state => state.approvalReducer);
    const {myPageInfo} = useSelector(state => state.memberReducer);


    useEffect(() => {
        dispatch(callBusinessDraftDetailAPI({approvalCode}))
    }, []);

    useEffect(() => {
        dispatch(callExpenseReportDetailAPI({approvalCode}))
    }, []);

    useEffect(() => {
        dispatch(callEmployeeAPI())
    }, []);



    return(
        <>
            {businessDraft &&
                <>
                    <h2 className="approval-title">{businessDraft.title}</h2>

                    {   /* 기안자이고 결재자 중 아무도 결재하지 않았을 경우 */
                        ((businessDraft.drafterName === myPageInfo.emplyName) &&
                        (businessDraft.approvers[0].approvalOpinion == null)) &&
                        <ButtonForCollect businessDraft={businessDraft}/>
                    }

                    {   /*기안자인 경우 */
                        businessDraft.approvers.find(approver => approver.approverName === myPageInfo.emplyName) &&
                        <ButtonForApprover businessDraft={businessDraft}/>
                    }

                    {/* 두 경우 동일하게 적용 */}
                    <BusinessDraftItem businessDraft={businessDraft}/>
                </>
            }

            {expenseReport &&
                <>
                    <h2 className="approval-title">{expenseReport.title}</h2>

                    {   /* 기안자이고 결재자 중 아무도 결재하지 않았을 경우 */
                        ((expenseReport.drafterName === myPageInfo.emplyName) &&
                            (expenseReport.approvers[0].approvalOpinion == null)) &&
                        <ButtonForCollect expenseReport={expenseReport}/>
                    }
                    {   /*기안자인 경우 */
                        expenseReport.approvers.find(approver => approver.approverName === myPageInfo.emplyName) &&
                        <ButtonForApprover expenseReport={expenseReport}/>
                    }


                    {/* 두 경우 동일하게 적용 */}
                    <ExpenseReportItem expenseReport={expenseReport}/>
                </>
            }
        </>
    );
}

export default AppDetail;