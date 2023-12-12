import {format} from "date-fns";

function ApproverView({approver}) {

    return(
        <>
            <div className="approver">
                <div className="approver-position">{approver.positionName}</div>
                <div className="approve-box">
                    <div className="approval-status">
                        {approver.approvalStatus === "승인" && (

                                <img className="approval-status-img"
                                    src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/459e8e19-6087-4ecd-922e-577c7956a3cf"
                                     alt="승인"
                                />

                        )}
                        {approver.approvalStatus === "반려" && (
                            <>
                                <img className="approval-status-img"
                                    src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/73124b4a-4ecc-4b55-a3a0-db5bae578983"
                                     alt="반려"
                                />
                            </>
                        )}
                    </div>
                    <div className="approverName">
                        {approver.approverName}
                    </div>
                </div>
                <div className="approval-date">
                    {approver.approvalDateTime !== "null" ?
                        approver.approvalDateTime.slice(2,10) : '  '}
                </div>
            </div>
        </>
    )

}

export default ApproverView;