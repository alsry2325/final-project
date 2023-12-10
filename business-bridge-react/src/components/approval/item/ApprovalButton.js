function ApprovalButton() {

    return(
        <>
            <div className="app-button-bar">
                <div className="back-to-list">
                    <img
                        src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/329c3372-759b-4f25-9f81-b1a86200c2b1"
                        className="back-img"/>
                    목록으로
                </div>
                {/*받은 결재 조회 - 결재, 반려, 보류*/}
                <div className="approval-button-div">
                    <button className="app-button app-blue-btn">결재</button>
                    <button className="app-button">반려</button>
                    <button className="app-button">보류</button>
                </div>

                {/*기안문서함 - 회수*/}
                <div className="approval-button-div">
                    <button className="app-button">회수</button>
                </div>

                {/*문서 작성,수정 시 - 임시저장, 결재요청, 취소*/}
                <div className="approval-button-div">
                    <button className="app-button">임시저장</button>
                    <button className="app-button app-blue-btn">결재요청</button>
                    <button className="app-button">취소</button>
                </div>
            </div>
            <div className="line-div"></div>
        </>
    );
}

export default ApprovalButton;