import ApproverView from "./ApproverView";
import {format} from "date-fns";
import ApprovalOpinionItem from "./ApprovalOpinionItem";

function ExpenseReportItem({ expenseReport }) {


    return(
        <>

            <div className="approval-doc-form-outline">
                <div className="approval-header">
                    <h3 className="approval-form-name">지출결의서</h3>
                    <div className="approver-list">
                        <h5 className="approver-info">결재</h5>
                        {
                            expenseReport.approvers &&
                            expenseReport.approvers.map(approver =>
                                (<ApproverView
                                    key={approver.approverId}
                                    approver={approver}/>))
                        }
                    </div>
                </div>

                <div className="approval-body">
                    <table className="draftInfo">
                    <tbody>
                        <tr>
                            <th className="app-table-info">기안자</th>
                            <td>{expenseReport.drafterName}</td>
                            <th className="app-table-info">부서</th>
                            <td>{expenseReport.departmentName}</td>
                        </tr>
                        <tr>
                            <th className="app-table-info">기안일</th>
                            <td>{format(new Date(expenseReport.draftDateTime), 'yy-MM-dd')}</td>
                            <th className="app-table-info">문서번호</th>
                            <td>{expenseReport.docNo}</td>
                        </tr>
                        <tr>
                            <th className="app-table-info">지출금액</th>
                            <td colSpan={"3"}>₩.{expenseReport.totalExpenditure}
                            </td>
                        </tr>
                        <tr>
                            <th className="app-table-info">제목</th>
                            <td colSpan={"3"}>
                                <div className="approval-title">
                                    {expenseReport.title}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className="app-table-info">내역</th>
                            <td colSpan={"3"} style={{padding:"0"}}>
                            <table className="ER-detail-table">
                                <tbody>
                                <tr>
                                    <td className="app-table-info">적요</td>
                                    <td className="app-table-info">금액</td>
                                    <td className="app-table-info">비고</td>
                                </tr>
                                { expenseReport.details.map((detail, index) => (
                                        <tr key={index}>
                                            <td>{detail.note}</td>
                                            <td>{detail.item}</td>
                                            <td>{detail.amount}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            </table>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>

                <div className="approval-file-div">
                    <h5>파일첨부</h5>
                    <div className="approval-file">
                        <div className="approval-file-add">
                            <img className="approval-attach-img"
                                 src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/9db9634b-1962-4ebf-89b8-7f0c327af689"/>
                            첨부파일 {expenseReport.attachFiles.length}개
                        </div>
                        <div className="file-view-div">
                            {expenseReport.attachFiles.map((file, index) => (
                                <div key={index} className="app-file-name">
                                    <img className="app-file-down-img"
                                         src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/dfa77b76-69a5-4734-a56f-382af648dedb"/>
                                    <a className="app-attach-a" href={file.fileUrl} download={file.fileName}>{file.fileName}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="shorter-line-div"></div>
                {
                    expenseReport.approvers &&
                    expenseReport.approvers.map(opinion =>
                        (<ApprovalOpinionItem
                            opinion={opinion}/>))
                }
            </div>
        </>
    );
}

export default ExpenseReportItem;