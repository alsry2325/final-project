import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callBusinessDraftDetailAPI, callExpenseReportDetailAPI} from "../../../apis/ApprovalAPICalls";
import {useNavigate, useParams} from "react-router-dom";
import BusinessDraftItem from "../../../components/items/approvalItems/BusinessDraftItem";
import ExpenseReportItem from "../../../components/items/approvalItems/ExpenseReportItem";
import {callEmployeeAPI} from "../../../apis/EmployeeAPICalls";
import ButtonForApprover from "../../../components/items/approvalItems/ButtonForApprover";
import ButtonForCollect from "../../../components/items/approvalItems/ButtonForCollect";

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

                    {/* 결재자인 경우 */}
                    <ButtonForApprover businessDraft={businessDraft}/>
                    {/* 기안자이고 결재자 중 아무도 결재하지 않았을 경우 */}
                    <ButtonForCollect businessDraft={businessDraft}/>

                    {/* 두 경우 동일하게 적용 */}
                    <BusinessDraftItem businessDraft={businessDraft}/>
                </>
            }
            {expenseReport &&
                <>
                    <h2 className="approval-title">{expenseReport.title}</h2>

                    {/*기안자인 경우 */}
                    <ButtonForApprover expenseReport={expenseReport}/>
                    {/* 기안자이고 결재자 중 아무도 결재하지 않았을 경우 */}
                    <ButtonForCollect expenseReport={expenseReport}/>

                    {/* 두 경우 동일하게 적용 */}
                    <ExpenseReportItem expenseReport={expenseReport}/>
                </>
            }
        </>
    );
}

export default AppDetail;