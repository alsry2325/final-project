import {useState} from "react";
import ApproverModal from "../../modal/ApproverModal";

function ApproverChoice({setForm}) {

    const[appEmplyModal, setAppEmplyModal] = useState(false);
    const [approvers, setApprovers] = useState([]);

    // 결재자 선택 버튼 클릭 시 모달 창 오픈
    const onclickChooseApprover = () => {
        setAppEmplyModal(true);
    }

    // 모달에서 넘어오는 값
    const selectedApprovers = ({selectedEmployees}) => {
        console.log("결재자 정보 : ", selectedEmployees)

        setApprovers([...selectedEmployees]);
        setForm({ "approver" : [approvers.emplyCode]});
    }



    return(
        <>
            {
                appEmplyModal && (
                <ApproverModal
                    setAppEmplyModal={setAppEmplyModal}
                    onSelectedApprovers={selectedApprovers}
                />
                )
            }
            <button
                className="choose-approver"
                onClick={onclickChooseApprover}
            >선택</button>
            <h5 className="approver-info">결재</h5>
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

export default ApproverChoice;