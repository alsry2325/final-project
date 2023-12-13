import {useEffect} from "react";
import {callEmployeeAPI} from "../../../apis/EmployeeAPICalls";
import {useDispatch, useSelector} from "react-redux";
import ERWriteForm from "../../../components/form/approvalForm/ERWriteForm";
import ButtonForWrite from "../../../components/items/approvalItems/ButtonForWrite";

function WriteExpenseReport() {

    const dispatch = useDispatch();
    const {myPageInfo} = useSelector(state => state.memberReducer);

    useEffect(() => {
        dispatch(callEmployeeAPI())
    }, []);

    return(
        <>
            <h2 className="approval-title">지출결의서</h2>
            <ButtonForWrite/>
            {
                myPageInfo &&
                <ERWriteForm myPageInfo={myPageInfo}/>
            }
        </>
    );

}

export default WriteExpenseReport;