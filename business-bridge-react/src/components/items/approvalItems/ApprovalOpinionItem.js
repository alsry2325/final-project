function ApprovalOpinionItem({ opinion }) {

    return (
        <div className="app-opinion-div">
            <div className="approver-img">
                {opinion.approverImg}
            </div>
            <div className="approver-name">
                {opinion.approverName}
                {opinion.positionName}
            </div>
            <div className="app-opinion-text">
                {opinion.approvalOpinion}
            </div>
            <div className="approve-time">
                {opinion.approvalDateTime}
            </div>
        </div>
    );
}

export default ApprovalOpinionItem;