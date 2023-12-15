import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAppEmployeeAPI } from "../../apis/ApprovalAPICalls";
import {useNavigate} from "react-router-dom";

function ApproverModal({ setAppEmplyModal, onSelectedApprovers }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allEmplys } = useSelector((state) => state.approvalReducer);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    useEffect(() => {
        dispatch(callAppEmployeeAPI());
    }, []);

    // 전체 직원에서 결재자로 클릭 할 시
    const onClickEmployee = (empCode) => {
        const clickedEmployee = allEmplys.find(
            (appEmp) => appEmp.emplyCode === empCode
        );

        // console.log("클릭된 직원:", clickedEmployee);
        // console.log("선택된 결재자들:", selectedEmployees);

        // 최대 세 명까지만 선택 허용
        if (selectedEmployees.length < 3) {
            // 기존 선택된 목록에 없는 경우에만 추가
            if (!selectedEmployees.some((selectedEmp) => selectedEmp.emplyCode === empCode)) {
                setSelectedEmployees([...selectedEmployees, clickedEmployee]);
            }
        }
    };


    // 결재자에 선택 된 직원 삭제 버튼 클릭 시
    const removeSelectedEmployee = (empCode) => {
        const updatedSelection = selectedEmployees.filter(
            (selectedEmp) => selectedEmp.emplyCode !== empCode
        );
        setSelectedEmployees(updatedSelection);
    };

    // 결재자 순서 변경 이벤트

    // 적용 클릭 시 선택 된 결재자 반복조회
    const onClickUse = (selectedEmployees) => {
        onSelectedApprovers({selectedEmployees});
        setAppEmplyModal(false);
    }

    // 취소 클릭 시 모달 창 닫기
    const onClickApproverCancle = () => {
        setAppEmplyModal(false);
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
                                        {appEmp.departmemtName} {appEmp.emplyName} {appEmp.positionName}
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
                                        {selectedEmp.departmemtName} {selectedEmp.emplyName} {selectedEmp.positionName}{" "}
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
                        <button
                            className="app-use"
                            onClick={() =>
                                onClickUse(selectedEmployees)}
                        >적용</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApproverModal;
