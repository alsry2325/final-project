import BDWriteForm from "../../../components/form/approvalForm/BDWriteForm";
import {useEffect, useState} from "react";
import {callEmployeeAPI} from "../../../apis/EmployeeAPICalls";
import {useDispatch, useSelector} from "react-redux";
import ButtonForWrite from "../../../components/items/approvalItems/ButtonForWrite";
import {callRegistBusinessDraftAPI} from "../../../apis/ApprovalAPICalls";

function WriteBusinessDraft() {

    const dispatch = useDispatch();
    const {myPageInfo} = useSelector(state => state.memberReducer);
    const [form, setForm] = useState({});

    useEffect(() => {
        dispatch(callEmployeeAPI())
    }, []);

   // dispatch(callRegistBusinessDraftAPI({registBD : formData}));


    return(
        <>
                <h2 className="approval-title">업무기안서</h2>
                <ButtonForWrite setForm={setForm}/>
            {
                myPageInfo &&
                <BDWriteForm setForm={setForm} myPageInfo={myPageInfo}/>
            }
        </>
    );

}

export default WriteBusinessDraft;