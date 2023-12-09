import Approver from "./Approver";

function BusinessDraftItem() {

    return(
        <>
            <div className="approval-doc-form-outline">
                <div className="approval-header">
                    <h3 className="approval-form-name">업무기안서</h3>
                    <div className="approver-list">
                        <button className="choose-approver">선택</button>
                        <h5 className="approver-info">결재</h5>
                        <div className="approver">
                            <Approver/>
                            {/*선택하는 만큼 결재자를 반복해야함!*/}
                        </div>
                    </div>
                </div>

                <div className="approval-body">
                    <table className="draftInfo">
                        <tr>
                            <td>기안자</td>
                            <td>기안자 이름 조회</td>
                            <td>부서</td>
                            <td>기안자 부서 조회</td>
                        </tr>
                        <tr>
                            <td>기안일</td>
                            <td>기안일 조회</td>
                            <td>문서번호</td>
                            <td>문서번호 조회</td>
                        </tr>

                        <tr>
                            <td>제목</td>
                            <td colSpan={"3"}>
                                <input
                                    readOnly={true}
                                    className="approval-title"
                                    type="text"
                                    name="title"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>상세 내용</td>
                            <td colSpan={"3"}>
                                <textarea
                                    readOnly={true}
                                    className="businessDraftContent"
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

export default BusinessDraftItem;