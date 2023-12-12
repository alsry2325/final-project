import ApproverChoice from "../../items/approvalItems/ApproverChoice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function BDWriteForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    return(
        <>
            <div className="approval-doc-form-outline">
                <div className="approval-header">
                    <h3 className="approval-form-name">업무기안서</h3>
                    <div className="approver-list">
                        <ApproverChoice/>
                    </div>
                </div>
                <div className="approval-body">
                    <table className="draftInfo">
                        <tr>
                            <td className="app-table-info">기안자</td>
                            <td>기안자 이름 조회</td>
                            <td className="app-table-info">부서</td>
                            <td>기안자 부서 조회</td>
                        </tr>
                        <tr>
                            <td className="app-table-info">기안일</td>
                            <td>기안일 조회</td>
                            <td className="app-table-info">문서번호</td>
                            <td>문서번호 조회</td>
                        </tr>
                        <tr>
                            <td className="app-table-info">제목</td>
                            <td colSpan={"3"}>
                                <input
                                    className="approval-title"
                                    type="text"
                                    name="title"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="app-table-info">상세 내용</td>
                            <td colSpan={"3"}>
                                <textarea
                                    className="businessDraftContent"
                                    type="text"
                                    name="businessDraftContent"
                                />
                            </td>
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

export default BDWriteForm;