import BDUpdateForm from "../../../components/form/approvalForm/BDUpdateForm";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {callBusinessDraftDetailAPI, callExpenseReportDetailAPI} from "../../../apis/ApprovalAPICalls";
import {useParams} from "react-router-dom";
import ButtonForUpdateBD from "../../../components/items/approvalItems/ButtonForUpdateBD";
import ERUpdateForm from "../../../components/form/approvalForm/ERUpdateForm";
import ButtonForUpdateER from "../../../components/items/approvalItems/ButtonForUpdateER";

function UpdateApp() {

    const {approvalCode} = useParams();
    const dispatch = useDispatch();
    const {businessDraft} = useSelector(state => state.approvalReducer);
    const {expenseReport} = useSelector(state => state.approvalReducer);
    const [form, setForm] = useState({});
    const fileInput = useRef();

    useEffect(() => {
        dispatch(callBusinessDraftDetailAPI({approvalCode}))
    }, []);

    useEffect(() => {
        dispatch(callExpenseReportDetailAPI({approvalCode}))
    }, []);


    return(
        <>
            {businessDraft&&
                <>
                    <h2 className="approval-title">{businessDraft.title}</h2>
                    <ButtonForUpdateBD fileInput={fileInput} form={form} approvalCode={approvalCode}/>
                    <BDUpdateForm businessDraft={businessDraft} form={form} setForm={setForm} fileInput={fileInput}/>
                </>
            }
            {expenseReport &&
                <>
                    <h2 className="approval-title">{expenseReport.title}</h2>
                    <ButtonForUpdateER fileInput={fileInput} form={form} approvalCode={approvalCode}/>
                    <ERUpdateForm expenseReport={expenseReport} form={form} setForm={setForm} fileInput={fileInput}/>
                </>
            }
        </>
    );
}

export default UpdateApp;