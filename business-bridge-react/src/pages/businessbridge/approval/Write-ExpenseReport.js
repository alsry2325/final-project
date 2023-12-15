import {useEffect, useRef, useState} from "react";
import {callEmployeeAPI} from "../../../apis/EmployeeAPICalls";
import {useDispatch, useSelector} from "react-redux";
import ERWriteForm from "../../../components/form/approvalForm/ERWriteForm";
import ButtonForWriteER from "../../../components/items/approvalItems/ButtonForWriteER";

function WriteExpenseReport() {

    const dispatch = useDispatch();
    const {myPageInfo} = useSelector(state => state.memberReducer);
    const [form, setForm] = useState();
    const fileInput = useRef();

    useEffect(() => {
        dispatch(callEmployeeAPI())
    }, []);

    return(
        <>
            <h2 className="approval-title">지출결의서</h2>
            <ButtonForWriteER fileInput={fileInput} form={form}/>
            {
                myPageInfo &&
                <ERWriteForm form={form} setForm={setForm} fileInput={fileInput} myPageInfo={myPageInfo}/>
            }
        </>
    );

}

export default WriteExpenseReport;