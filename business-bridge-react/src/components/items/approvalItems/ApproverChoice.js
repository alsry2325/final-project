import {useState} from "react";
import ApproverModal from "../../modal/ApproverModal";
import {useSelector} from "react-redux";

function ApproverChoice() {

    const[appEmplyModal, setAppEmplyModal] = useState(false);
    const {allEmplys} = useSelector(state => state.approvalReducer);

    const onclickChooseApprover = () => {
        setAppEmplyModal(true);
    }

    return(
        <>
            {
                appEmplyModal &&
                <ApproverModal setAppEmplyModal={setAppEmplyModal} allEmplys={allEmplys}/>
            }
            <button
                className="choose-approver"
                onClick={onclickChooseApprover}
            >선택</button>
            <h5 className="approver-info">결재</h5>
            <div className="approver">
                <div className="approver-position">결재자 직급</div>
                <div className="approve-box">
                    {/*승인 도장, 결재자 이름*/}
                </div>
                <div className="approval-date">결재일시</div>
            </div>
        </>
    )

}

export default ApproverChoice;