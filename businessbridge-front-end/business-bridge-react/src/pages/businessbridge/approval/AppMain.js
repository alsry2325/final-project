import InProgressLists from "../../../components/items/approvalItems/main/InProgressLists";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callReceiveApprovalsListAPI} from "../../../apis/ApprovalAPICalls";

function AppMain(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { receiveAllApprovals } = useSelector(state => state.approvalReducer);   //모듈에 정의한 key값

    useEffect(() => {
        dispatch(callReceiveApprovalsListAPI({currentPage}));
    }, [currentPage]);


    return (
        <>
            <h2 className="approval-title">전자결재 홈</h2>
            {receiveAllApprovals &&
                <InProgressLists data={receiveAllApprovals.data}/>
            }

        </>
    );
}

export default AppMain;