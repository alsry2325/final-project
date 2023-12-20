function ApprovalOpinionItem({ opinion }) {

    // opinion.approvalDateTime을 Date 객체로 변환
    const approvalDateTime = new Date(opinion.approvalDateTime);
    const formattedDateTime = `${approvalDateTime.getFullYear()}-${(approvalDateTime.getMonth() + 1).toString().padStart(2, '0')}-${approvalDateTime.getDate().toString().padStart(2, '0')}
    ${approvalDateTime.getHours().toString().padStart(2, '0')}:${approvalDateTime.getMinutes().toString().padStart(2, '0')}`;

    if (opinion.approvalOpinion === null) {
        return null;
    }
    
    return (
            <div className="app-opinion-div">
                <div className="approver-img">
                    <img className="opinion-profile-img" src={opinion.approverImg}/>
                </div>
                <div className="approver-name">
                    {opinion.approverName}
                    {opinion.positionName}
                </div>
                <div className="app-opinion-text">
                    {opinion.approvalOpinion}
                </div>
                <div className="approve-time">
                    {formattedDateTime}
                </div>
            </div>
    );
}

export default ApprovalOpinionItem;