import ApproverChoice from "../item/ApproverChoice";
import ApproverModal from "../modal/ApproverModal";
import {useState} from "react";
import {useSelector} from "react-redux";

function ERWriteForm() {


    return(
        <>

            <div className="approval-doc-form-outline">
                <div className="approval-header">
                    <h3 className="approval-form-name">지출결의서</h3>
                    <div className="approver-list">
                        <ApproverChoice/>
                    </div>
                </div>

                <div className="approval-body">
                    <table className="draftInfo">
                        <tr>
                            <th className="app-table-info">기안자</th>
                            <td>기안자 이름 조회</td>
                            <th className="app-table-info">부서</th>
                            <td>기안자 부서 조회</td>
                        </tr>
                        <tr>
                            <th className="app-table-info">기안일</th>
                            <td>기안일 조회</td>
                            <th className="app-table-info">문서번호</th>
                            <td>문서번호 조회</td>
                        </tr>
                        <tr>
                            <th className="app-table-info">지출금액</th>
                            <td colSpan={"3"}>₩.
                                <input
                                    className="total-expenditure"
                                    type="number"
                                    name="title"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="app-table-info">제목</th>
                            <td colSpan={"3"}>
                                <input
                                    className="approval-title"
                                    type="text"
                                    name="title"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="app-table-info">내역</th>
                            <table className="ER-detail-table">
                                <tr>
                                    <td className="app-table-info">적요</td>
                                    <td className="app-table-info">금액</td>
                                    <td className="app-table-info">비고</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </table>
                        </tr>
                    </table>
                </div>

                <div className="approval-file-div">
                    <h5>파일첨부</h5>
                    <div className="approval-file">
                        <img className="approval-attach-img"
                             src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/9db9634b-1962-4ebf-89b8-7f0c327af689"/>
                        파일 선택</div>
                </div>
            </div>
        </>
    );
}

export default ERWriteForm;