import {useNavigate} from "react-router-dom";

function ButtonForApprover() {

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
                {/*받은 결재 조회 - 결재, 반려, 보류*/}
                <div className="approval-button-div">
                    <button className="app-button app-blue-btn">결재</button>
                    <button className="app-button">반려</button>
                    <button className="app-button">보류</button>
                </div>

            </div>
            <div className="line-div"/>
        </>
    );
}

export default ButtonForApprover;