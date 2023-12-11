import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callAppEmployeeAPI} from "../../apis/ApprovalAPICalls";
import {el} from "date-fns/locale";

function ApproverModal({setAppEmplyModal}) {

    const dispatch = useDispatch();
    const {allEmplys} = useSelector(state => state.approvalReducer);

    const [selectedEmplys, setSelectedEmplys] = useState([]);

    const onClickApproverCancle = () => {
        setAppEmplyModal(false);
    }

    const onClickEmp = (empCode) => {
        const isEmpSelected = selectedEmplys.includes(empCode);
        // 직원이 이미 선택되었는지 확인

        if(isEmpSelected) {
            const updateSelection = selectedEmplys.filter(
                (selectedEmp) => selectedEmp !== empCode
            );
            setSelectedEmplys(updateSelection);
        } else {
            setSelectedEmplys([...selectedEmplys, empCode]);
        }
    };

    useEffect(() => {
        dispatch(callAppEmployeeAPI());
    }, []);

    return(
        <div className="modal">
            <div className="app-modal-container">
                <h2>결재자 선택</h2>
                <div className="app-modal-body">
                    <div className="app-modal-left">
                        <h3>전체 직원</h3>
                        <div className="app-emply-list">
                            {
                                allEmplys &&
                                allEmplys.map(appEmp => (
                                    <div  className={`app-employee ${
                                        selectedEmplys.includes(appEmp.emplyCode)
                                            ? "selected"
                                            : ""
                                    }`}
                                         key={allEmplys.emplyCode}
                                          onClick={() => onClickEmp(appEmp.emplyCode)}
                                    >
                                        {appEmp.emplyName} {appEmp.positionName}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="app-modal-right">
                        <h3>결재자</h3>
                        <div className="choosen-approver">
                            {
                                selectedEmplys &&
                                selectedEmplys.map((empCode) => (
                                    <div key={empCode}>{empCode}</div>
                                ))
                        }
                        </div>
                        <button className="app-up">&#9650;</button>
                        <button className="app-down">&#9660;</button>
                        <button
                            className="app-cancle"
                            onClick={onClickApproverCancle}
                        >취소</button>
                        <button className="app-use">적용</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApproverModal;