import {ToastContainer} from "react-toastify";
import PagingBar from "../../components/common/PagingBar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {callReceiveAppsByStatusAPI} from "../../apis/ApprovalAPICalls";
import { format } from 'date-fns';

function ReceiveAppsByStatus() {

    const {approvalStatus} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { receiveApprovalsBy } = useSelector(state => state.approvalReducer);   //모듈에 정의한 key값
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callReceiveAppsByStatusAPI({currentPage, approvalStatus}));
    }, [currentPage, approvalStatus]);

    const onClickApproval = (approvalCode) => {
        navigate(`/approval/document/${approvalCode}`);
    }

    return(
        <>
            <ToastContainer position="top-center"/>
            <div className="approval-div">
                <h2 className="approval-title">받은 결재</h2>
                {
                    receiveApprovalsBy &&
                    <>
                        <div className="approval-tool-bar">
                            <ul className="tab-nav">
                                <li id="tab-all" className="first" style={{borderBottom:"solid 2px"}}>
                                    <NavLink className="tab-item" to="/approval/receive-approvals/all">
                                        <strong>전체</strong>
                                    </NavLink>
                                </li>
                                <li id="tab-hold">
                                    <NavLink className="tab-item" to="/approval/receive-approvals/PENDING">
                                        <span style={{color:'#868686'}}>보류</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <table className="approval-list-table">
                            <colgroup>
                                <col width="15%"/>
                                <col width="10%"/>
                                <col width="40%"/>
                                <col width="5%"/>
                                <col width="10%"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>결재양식</th>
                                <th>기안자</th>
                                <th>제목</th>
                                <th>첨부</th>
                                <th>기안일</th>
                            </tr>
                            </thead>
                            <tbody>
                            { receiveApprovalsBy.data.map(approval => (
                                <tr key={approval.approvalCode}
                                    onClick={() => onClickApproval(approval.approvalCode)}>

                                    <td>{approval.docForm}</td>
                                    <td>{approval.emplyName}</td>
                                    <td>{approval.title}</td>
                                    <td>{approval.fileCount}</td>
                                    <td>{format(new Date(approval.draftDateTime),'yy-MM-dd') }</td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                        <PagingBar pageInfo={receiveApprovalsBy.pageInfo} setCurrentPage={setCurrentPage}/>
                    </>
                }
            </div>
        </>
    );
}

export default ReceiveAppsByStatus;