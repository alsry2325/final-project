
import EmployeeInformation from "../../components/main/EmployeeInformation";
import NoteRecipeientList from "../../components/main/MainList";
import Salesstatistics from "../../components/main/Salesstatistics";
import ElectronicPayment from "../../components/main/ElectronicPayment";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callReceiveApprovalsListAPI} from "../../apis/ApprovalAPICalls";
import InProgressLists from "../../components/items/approvalItems/main/InProgressLists";
import {callEmployeeAPI} from "../../apis/EmployeeAPICalls";


function Main(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { receiveAllApprovals } = useSelector(state => state.approvalReducer);   //모듈에 정의한 key값

    useEffect(() => {
        dispatch(callReceiveApprovalsListAPI({currentPage}));
    }, [currentPage]);

    return(
        <>
            <div className="main-area">
                    <EmployeeInformation/>
                <div className="main-NoteRecipeientList-area">
                    <NoteRecipeientList/>
                    <div className="main-sales-statistics-area">
                        <Salesstatistics/>
                        <div className="main-electronic-payment-area">
                            {receiveAllApprovals &&
                                <InProgressLists data={receiveAllApprovals.data}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}

export default Main;