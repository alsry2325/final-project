import {useState} from "react";
import ApproverModal from "../../modal/ApproverModal";
import ApproverView from "./ApproverView";

function
ApproverUpdate({businessDraft, form, setForm}) {

    const[appEmplyModal, setAppEmplyModal] = useState(false);
    const [approvers, setApprovers] = useState([]);

    // 결재자 선택 버튼 클릭 시 모달 창 오픈
    const onClickChooseApprover = () => {
        setApprovers([]); // 기존에 선택된 결재자 초기화
        setAppEmplyModal(true);
    };

    // 모달에서 넘어오는 값
    const selectedApprovers = ({selectedEmployees}) => {
        console.log("결재자 정보 : ", selectedEmployees)

        setApprovers([...selectedEmployees]);
        setForm({
            ...form,
            "approvers" : selectedEmployees.map(emply => emply.emplyCode)
        });
    }


    return(
        <>
            {
                appEmplyModal && (
                <ApproverModal
                    setAppEmplyModal={setAppEmplyModal}
                    onSelectedApprovers={selectedApprovers}
                    existingApprovers={businessDraft.approvers}
                />
                )
            }
            <button
                className="choose-approver"
                onClick={onClickChooseApprover}
            >선택</button>
            <h5 className="approver-info">결재</h5>
            {/* 기존 값 조회 */}
            {
                businessDraft.approvers &&
                businessDraft.approvers.map(approver =>
                    (<div className="approver"
                          key={approver.approverId}>
                        <div className="approver-position">{approver.positionName}</div>
                        <div className="approve-box">
                            {approver.approverName}
                        </div>
                        <div className="approval-date"></div>
                    </div>))
            }
            {approvers &&
                approvers.map((approver) => (
                        <div className="approver"
                            key={approver.emplyCode}>
                            <div className="approver-position">{approver.positionName}</div>
                            <div className="approve-box">
                                {approver.emplyName}
                            </div>
                            <div className="approval-date"></div>
                        </div>
                    )
                )
            }
        </>
    )
}

export default ApproverUpdate;