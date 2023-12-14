import {useNavigate} from "react-router-dom";

function ButtonForCollect() {

    const navigate = useNavigate();

    return (
        <>
            <div className="app-button-bar">
                <div
                    className="back-to-list"
                    onClick={() => navigate(-1)}
                >
                    <img
                        src="https://github.com/Business-Bridge/businessbridge-front-end/assets/138549058/329c3372-759b-4f25-9f81-b1a86200c2b1"
                        className="back-img"/>
                    목록으로
                </div>

                {/*기안문서함 - 회수*/
                    // ((isDrafter && businessDraft.approvalOpinion == null)  ||
                    // (isDrafter && expenseReport.approvalOpinion == null)) &&
                    <div className="approval-button-div">
                        <button className="app-button">회수</button>
                    </div>
                }
            </div>
            <div className="line-div"/>
        </>
    );
}

export default ButtonForCollect;