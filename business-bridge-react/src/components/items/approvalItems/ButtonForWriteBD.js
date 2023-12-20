import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callRegistBusinessDraftAPI} from "../../../apis/ApprovalAPICalls";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

function ButtonForWriteBD({fileInput, form}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {registBD} = useSelector((state) => state.approvalReducer);


    // 등록 성공시에 전자결재 홈으로 이동
    useEffect(() => {
        if (registBD === true) {
            navigate('/approval/receive-approvals/all', {replace: true})        // navigate (-1) 할까,,
        }
    }, [registBD]);

    // 임시저장 클릭 시에 docStatus가 "임시저장"
    const onClickTempStorage = () => {
        if(form.title == null){
            toast.warning('업무기안서 제목을 입력해 주세요.')
            return false;
        }

        if(form.businessDraftContent == null){
            toast.warning('업무기안서 상세 내용을 입력해 주세요.');
            return false;
        }

        if(form.approvers == null){
            toast.warning('결재자를 선택해주세요.');
            return false;
        }

        const result = window.confirm('임시저장 하시겠습니까?');
        if(result) {
                dispatch(callRegistBusinessDraftAPI({form, files: fileInput.current.files, docStatus: "임시저장"}));
        }
    }

    // 결재요청 클릭 시에 docStatus가 "대기"
    const onClickApprove = () => {
        if(form.title == null){
            toast.warning('업무기안서 제목을 입력해 주세요.')
            return false;
        }

        if(form.businessDraftContent == null){
            toast.warning('업무기안서 상세 내용을 입력해 주세요.');
            return false;
        }

        if(form.approvers == null){
            toast.warning('결재자를 선택해주세요.');
            return false;
        }
        const result = window.confirm('결재 요청 하시겠습니까?');
        if(result) {

                dispatch(callRegistBusinessDraftAPI({form, files: fileInput.current.files, docStatus: "대기"}));
        }
    }

    return (
        <>
            <ToastContainer position="top-center" hideProgressBar={true}/>
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

export default ButtonForWriteBD;