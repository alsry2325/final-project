import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callCollectAppAPI} from "../../../apis/ApprovalAPICalls";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";

function ButtonForCollect({businessDraft, expenseReport}) {

    const {approvalCode} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {appCollect} = useSelector((state) => state.approvalReducer);


    useEffect(() => {
        if(appCollect === true) {
            navigate(`/approval/document/${approvalCode}`, {replace: true})
        }
    }, [appCollect]);


    const onClickCollectApp = () => {
        const result = window.confirm('회수 하시겠습니까?')
        if(result) {
            dispatch(callCollectAppAPI({approvalCode}));
        }

    }

    return (
        <>
            <ToastContainer/>
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

                {
                    <div className="approval-button-div">
                        <button
                            onClick={onClickCollectApp}
                            className="app-button">회수</button>
                    </div>
                }
            </div>
            <div className="line-div"/>
        </>
    );
}

export default ButtonForCollect;