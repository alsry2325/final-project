import ApprovalButton from "../../components/items/approvalItems/ApprovalButton";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callBusinessDraftDetailAPI, callExpenseReportDetailAPI} from "../../apis/ApprovalAPICalls";
import {useParams} from "react-router-dom";
import BusinessDraftItem from "../../components/items/approvalItems/BusinessDraftItem";
import ExpenseReportItem from "../../components/items/approvalItems/ExpenseReportItem";

function AppDetail() {

    const dispatch = useDispatch();
    const {approvalCode} = useParams();
    const {businessDraft} = useSelector(state => state.approvalReducer);
    const {expenseReport} = useSelector(state => state.approvalReducer);

    useEffect(() => {
        dispatch(callBusinessDraftDetailAPI({approvalCode}))
    }, []);

    useEffect(() => {
        dispatch(callExpenseReportDetailAPI({approvalCode}))
    }, []);

    return(
        <>
            {businessDraft &&
                <>
                    <h2 className="approval-title">{businessDraft.title}</h2>
                    <ApprovalButton/>
                    <BusinessDraftItem businessDraft={businessDraft}/>
                </>
            }
            {expenseReport &&
                <>
                    <h2 className="approval-title">{expenseReport.title}</h2>
                    <ApprovalButton/>
                    <ExpenseReportItem expenseReport={expenseReport}/>
                </>
            }
        </>
    );
}

export default AppDetail;