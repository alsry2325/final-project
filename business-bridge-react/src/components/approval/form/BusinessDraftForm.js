function BusinessDraftForm() {

    return(
        <>
            <div className="approval-doc-form-outline">
                <div className="approval-header">
                    <h3 className="approval-doc-title">업무기안서</h3>
                    <div className="approver-list">
                        <button className="choose-approver">선택</button>
                        <h5 className="approver-info">결재</h5>
                        <div className="approver">
                            <div className="approver-position">결재자 직급</div>
                            <div className="approve-box">
                                {/*승인 도장, 결재자 이름*/}
                            </div>
                            <div className="approval-date">결재일시</div>
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
                            <tr>기안일</tr>
                            <tr>기안일 조회</tr>
                            <tr>문서번호</tr>
                            <tr>문서번호 조회</tr>
                        </tr>
                    </table>

                    <table className="BD-content">
                        <tr>
                            <td>제목</td>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>상세 내용</td>
                            <td>
                                <input
                                    type="text"
                                    name="businessDraftContent"
                                />
                            </td>
                        </tr>
                    </table>
                </div>

                <div className="approval-file">
                    <h5>파일첨부</h5>
                    <div>파일 선택</div>
                </div>
            </div>
        </>
    );
}

export default BusinessDraftForm;