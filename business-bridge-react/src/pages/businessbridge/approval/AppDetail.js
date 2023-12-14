import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callBusinessDraftDetailAPI, callExpenseReportDetailAPI} from "../../../apis/ApprovalAPICalls";
import {useParams} from "react-router-dom";
import BusinessDraftItem from "../../../components/items/approvalItems/BusinessDraftItem";
import ExpenseReportItem from "../../../components/items/approvalItems/ExpenseReportItem";
import {callEmployeeAPI} from "../../../apis/EmployeeAPICalls";
import ButtonForApprover from "../../../components/items/approvalItems/ButtonForApprover";

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
                    {/*기안자인지 결재자인지에 따라 버튼 달라야 함..!
                    /*기안문서함 - 회수*/
                        // ((isDrafter && businessDraft.approvalOpinion == null)  ||
                        // (isDrafter && expenseReport.approvalOpinion == null)) &&*/
                    }
                    <ButtonForApprover
                        businessDraft={businessDraft}/>
                    <BusinessDraftItem businessDraft={businessDraft}/>
                </>
            }
            {expenseReport &&
                <>
                    <h2 className="approval-title">{expenseReport.title}</h2>
                    {/*기안자인지 결재자인지에 따라 버튼 달라야 함..!*/}
                    <ButtonForApprover
                        expenseReport={expenseReport}/>
                    <ExpenseReportItem expenseReport={expenseReport}/>
                </>
            }
        </>
    );
}

export default AppDetail;