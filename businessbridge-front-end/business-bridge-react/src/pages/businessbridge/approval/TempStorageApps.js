import {ToastContainer} from "react-toastify";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {format} from "date-fns";
import PagingBar from "../../../components/common/PagingBar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callDraftCollectAPI, callTempStorageAppsAPI} from "../../../apis/ApprovalAPICalls";

function TempStorageApps() {

    const {docStatus} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { tempStorages } = useSelector(state => state.approvalReducer);   //모듈에 정의한 key값
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callTempStorageAppsAPI({currentPage}));
    }, [currentPage]);

    const onClickApproval = (approvalCode) => {
        navigate(`/approval/update/${approvalCode}`);
    }

    return(
        <>
            <ToastContainer position="top-center"/>
            <div className="approval-div">
                <h2 className="approval-title">임시 저장함</h2>
                {
                    tempStorages && tempStorages.data.length > 0 ? (
                    <>
                        <table className="sales-table approval-list-table">
                            <colgroup>
                                <col width="10%"/>
                                <col width="15%"/>
                                <col width="35%"/>
                                <col width="10%"/>
                                <col width="20%"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>결재상태</th>
                                <th>결재양식</th>
                                <th>제목</th>
                                <th>첨부</th>
                                <th>최종 작성일</th>
                            </tr>
                            </thead>
                            <tbody>
                            { tempStorages.data.map(approval => (
                                <tr key={approval.approvalCode}
                                    onClick={() => onClickApproval(approval.approvalCode)}>

                                    <td>
                                        <div className="docStatus-div docStatus-tempStorage">{approval.docStatus}</div>
                                    </td>
                                    <td>{approval.docForm}</td>
                                    <td>{approval.title}</td>
                                    <td>{approval.fileCount}</td>
                                    <td>{format(new Date(approval.draftDateTime),'yy-MM-dd') }</td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                        <PagingBar pageInfo={tempStorages.pageInfo} setCurrentPage={setCurrentPage}/>
                    </>
                    ) : (
                        <table className="sales-table approval-list-table">
                            <colgroup>
                                <col width="10%"/>
                                <col width="15%"/>
                                <col width="35%"/>
                                <col width="10%"/>
                                <col width="20%"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>결재상태</th>
                                <th>결재양식</th>
                                <th>제목</th>
                                <th>첨부</th>
                                <th>최종 작성일</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={5}>
                                        <div className="no-app-info">결재한 문서가 없습니다.</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )
                }
            </div>
        </>
    );
}

export default TempStorageApps;