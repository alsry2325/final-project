import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAppEmployeeAPI } from "../../apis/ApprovalAPICalls";

function ApproverModal({ setAppEmplyModal }) {
    const dispatch = useDispatch();
    const { allEmplys } = useSelector((state) => state.approvalReducer);

    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => {
        dispatch(callAppEmployeeAPI());
    }, []);

    const onClickApproverCancle = () => {
        setAppEmplyModal(false);
    };

    const onClickEmployee = (empCode) => {
        const clickedEmployee = allEmplys.find(
            (appEmp) => appEmp.emplyCode === empCode
        );

        // 최대 세 명까지만 선택 허용
        if (selectedEmployees.length < 3) {
            setSelectedEmployees([...selectedEmployees, clickedEmployee]);
        }
    };

    const removeSelectedEmployee = (empCode) => {
        const updatedSelection = selectedEmployees.filter(
            (selectedEmp) => selectedEmp.emplyCode !== empCode
        );
        setSelectedEmployees(updatedSelection);
    };

    return (
        <div className="modal">
            <div className="app-modal-container">
                <h2>결재자 선택</h2>
                <div className="app-modal-body">
                    <div className="app-modal-left">
                        <h3>전체 직원</h3>
                        <div className="app-emply-list">
                            {allEmplys &&
                                allEmplys.map((appEmp) => (
                                    <div
                                        className={`app-employee ${
                                            selectedEmployees.some(
                                                (selectedEmp) => selectedEmp.emplyCode === appEmp.emplyCode
                                            )
                                                ? "selected"
                                                : ""
                                        }`}
                                        key={appEmp.emplyCode}
                                        onClick={() => onClickEmployee(appEmp.emplyCode)}
                                    >
                                        {appEmp.emplyName} {appEmp.positionName}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="app-modal-right">
                        <h3>결재자</h3>
                        <div className="choosen-approver">
                            {selectedEmployees.map((selectedEmp) => (
                                <div
                                    key={selectedEmp.emplyCode}
                                    className="choosen-emp-btn-div"
                                >
                                    <div className="app-employee">
                                        {selectedEmp.emplyName} {selectedEmp.positionName}{" "}
                                    </div>
                                    <button
                                        onClick={() => removeSelectedEmployee(selectedEmp.emplyCode)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="app-up">&#9650;</button>
                        <button className="app-down">&#9660;</button>
                        <button className="app-cancle" onClick={onClickApproverCancle}>
                            취소
                        </button>
                        <button className="app-use">적용</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApproverModal;
