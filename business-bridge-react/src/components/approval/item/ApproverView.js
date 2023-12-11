import {useState} from "react";
import ApproverModal from "../modal/ApproverModal";
import {useSelector} from "react-redux";
import {logger} from "redux-logger/src";

function ApproverView({approver}) {


    console.log(approver)
    return(

        <>
            <div className="approver">
                <div className="approver-position">{approver}</div>
                <div className="approve-box">
                    {/*승인 도장, 결재자 이름*/}
                    {approver}
                </div>
                <div className="approval-date">{approver}</div>
            </div>
        </>
    )

}

export default ApproverView;