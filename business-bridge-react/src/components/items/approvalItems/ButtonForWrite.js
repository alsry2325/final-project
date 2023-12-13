import {Form, useNavigate} from "react-router-dom";

function ButtonForWrite({setForm}) {

    const navigate = useNavigate();

    // 임시저장 클릭 시에 docStatus가 "임시저장"
    const onClickTempStorage = () => {
        setForm({"docStatus" : "임시저장"});
    }

    // 결재요청 클릭 시에 docStatus가 "대기"
    const onClickApprove = () => {
        setForm({"docStatus" : "대기"});

        const formData = new FormData();
    }

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

                <div className="approval-button-div">
                    <button
                        onClick={onClickTempStorage}
                        className="app-button"
                    >임시저장</button>

                    <button
                        onClick={onClickApprove}
                        className="app-button app-blue-btn"
                    >결재요청</button>

                    <button
                        className="app-button"
                        onClick={() => navigate(-1)}
                    >취소</button>
                </div>

            </div>
            <div className="line-div"/>
        </>
    );
}

export default ButtonForWrite;