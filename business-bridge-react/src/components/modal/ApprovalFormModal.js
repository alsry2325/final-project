import {useNavigate} from "react-router-dom";

function ApprovalFormModal({ setAppFormModal }) {

    const navigate = useNavigate();

    const onClickRegistBusinessDraft = () => {
        setAppFormModal(false);
        navigate(`/approval/write/businessDraft`);
    };

    const onClickRegistER = () => {
        setAppFormModal(false);
        navigate('/approval/write/expenseReport')
    }
    return (
        <div className="modal">
            <div className="app-modal-container">
                <div className="approval-form-modal-div">

                    <div className="form-modal-header">
                        <h3>전자결재 양식</h3>
                        <img className="close-modal-img"
                            src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/e5019604-ff4b-40b3-8bbd-cfe351fcfaae"
                            onClick={() => setAppFormModal(false)}
                        />
                    </div>

                    <div className="form-modal-body">
                        <div className="form-type">
                            <h4>일반</h4>
                            <div className="shorter-line-div"></div>
                            <span onClick={onClickRegistBusinessDraft}>업무 기안서</span>
                        </div>

                        <div className="form-type">
                            <h4>지출결의</h4>
                            <div className="shorter-line-div"></div>
                            <span onClick={onClickRegistER}>지출결의서</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ApprovalFormModal;