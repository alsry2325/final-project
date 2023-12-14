import {Form, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callRegistBusinessDraftAPI, callRegistExpenseReportAPI} from "../../../apis/ApprovalAPICalls";
import {useEffect} from "react";

function ButtonForWriteER({fileInput, form}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {registER} = useSelector((state) => state.approvalReducer);


    useEffect(() => {
        if(registER === true) {
            navigate('/approval/home', {replace: true})        // navigate (-1) 할까,,)
        }
    }, [registER]);

    // 임시저장 클릭 시에 docStatus가 "임시저장"
    const onClickTempStorage = () => {
        const result = window.confirm('임시저장 하시겠습니까?');
        if(result) {
                dispatch(callRegistExpenseReportAPI({form, files : fileInput.current.files, docStatus : "임시저장"}));
        }
    }

    // 결재요청 클릭 시에 docStatus가 "대기"
    const onClickApprove = () => {
        const result = window.confirm('결재 요청 하시겠습니까?');
        if(result) {
                dispatch(callRegistExpenseReportAPI({form, files : fileInput.current.files, docStatus : "대기"}));
        }
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

export default ButtonForWriteER;