import ApproverView from "./ApproverView";
import {format} from "date-fns";
import ApprovalOpinionItem from "./ApprovalOpinionItem";

function BusinessDraftItem({businessDraft}) {

    return(
        <>
            <div className="approval-doc-form-outline">
                <div className="approval-header">
                    <h3 className="approval-form-name">업무기안서</h3>
                    <div className="approver-list">
                        <h5 className="approver-info">결재</h5>
                            {
                                businessDraft.approvers &&
                                businessDraft.approvers.map(approver =>
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
                            <td className="app-table-info">기안자</td>
                            <td>{businessDraft.drafterName}</td>
                            <td className="app-table-info">부서</td>
                            <td>{businessDraft.departmentName}</td>
                        </tr>
                        <tr>
                            <td className="app-table-info">기안일</td>
                            <td>{format(new Date(businessDraft.draftDateTime), 'yy-MM-dd')}</td>
                            <td className="app-table-info">문서번호</td>
                            <td>{businessDraft.docNo}</td>
                        </tr>

                        <tr>
                            <td className="app-table-info">제목</td>
                            <td colSpan={"3"}>
                                <div className="approval-table-title">
                                    {businessDraft.title}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="app-table-info">상세 내용</td>
                            <td colSpan={"3"}
                                style={{height:"300px"}}
                            >
                                {businessDraft.businessDraftContent}
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
                            첨부파일 {businessDraft.attachFiles.length}개
                        </div>
                        <div className="file-view-div">
                            {businessDraft.attachFiles.map((file, index) => (
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
                    businessDraft.approvers &&
                    businessDraft.approvers.map(opinion =>
                        (<ApprovalOpinionItem
                            key={opinion.approverId}
                            opinion={opinion}/>))
                }
            </div>
        </>
    );
}

export default BusinessDraftItem;