import BDWriteForm from "../../../components/form/approvalForm/BDWriteForm";
import {useEffect, useRef, useState} from "react";
import {callEmployeeAPI} from "../../../apis/EmployeeAPICalls";
import {useDispatch, useSelector} from "react-redux";
import ButtonForWriteBD from "../../../components/items/approvalItems/ButtonForWriteBD";

function WriteBusinessDraft() {

    const dispatch = useDispatch();
    const {myPageInfo} = useSelector(state => state.memberReducer);
    const [form, setForm] = useState({});
    const fileInput = useRef();

    useEffect(() => {
        dispatch(callEmployeeAPI())
    }, []);

    return(
        <>
                <h2 className="approval-title">업무기안서</h2>
                <ButtonForWriteBD fileInput={fileInput} form={form}/>
            {
                myPageInfo &&
                <BDWriteForm form={form} setForm={setForm} fileInput={fileInput} myPageInfo={myPageInfo}/>
            }
        </>
    );

}

export default WriteBusinessDraft;