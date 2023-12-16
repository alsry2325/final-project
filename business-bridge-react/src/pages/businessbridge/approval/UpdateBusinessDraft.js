import BDUpdateForm from "../../../components/form/approvalForm/BDUpdateForm";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {callBusinessDraftDetailAPI} from "../../../apis/ApprovalAPICalls";
import {useParams} from "react-router-dom";
import ButtonForUpdateBD from "../../../components/items/approvalItems/ButtonForUpdateBD";

function UpdateBusinessDraft() {

    const {approvalCode} = useParams();
    const dispatch = useDispatch();
    const {businessDraft} = useSelector(state => state.approvalReducer);
    const [form, setForm] = useState({});
    const fileInput = useRef();

    useEffect(() => {
        dispatch(callBusinessDraftDetailAPI({approvalCode}))
    }, []);

    return(
        <>
            {businessDraft&&
                <>
                    <h2 className="approval-title">{businessDraft.title}</h2>
                    <ButtonForUpdateBD fileInput={fileInput} form={form}/>
                    <BDUpdateForm businessDraft={businessDraft} form={form} setForm={setForm} fileInput={fileInput}/>
                </>
            }
        </>
    );
}

export default UpdateBusinessDraft;