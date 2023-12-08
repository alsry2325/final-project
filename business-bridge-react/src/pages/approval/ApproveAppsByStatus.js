import {ToastContainer} from "react-toastify";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {format} from "date-fns";
import PagingBar from "../../components/common/PagingBar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callApproveAppsByStatusAPI} from "../../apis/ApprovalAPICalls";

function ApproveAppsByStatus() {

    const {docStatus} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { approveAppsBy } = useSelector(state => state.approvalReducer);   //모듈에 정의한 key값
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callApproveAppsByStatusAPI({currentPage, docStatus}));
    }, [currentPage, docStatus]);

    const onClickApproval = (approvalCode) => {
        navigate(`/approval/document/${approvalCode}`);
    }

    return(
        <>
            <ToastContainer position="top-center"/>
            <div className="approval-div">
                <h2 className="approval-title">결재한 문서함</h2>
                {
                    approveAppsBy &&
                    <>
                        <div className="approval-tool-bar">
                            <ul className="tab-nav">
                                <NavLink className="tab-item"
                                         to="/approval/approve-approvals/all">
                                    <li id="tab-all" className="first">
                                        <span style={{color:'#868686'}}>전체</span>
                                    </li>
                                </NavLink>
                                <NavLink className="tab-item"
                                         to="/approval/approve-approvals/PROCEEDING"
                                         activeClassName="selected-tab">
                                    <li id="tab-hold" className="AP">
                                        <span className="tab-text">진행중</span>
                                    </li>
                                </NavLink>

                                <NavLink className="tab-item"
                                         to="/approval/approve-approvals/COMPLETE"
                                         activeClassName="selected-tab">
                                    <li id="tab-hold" className="AP">
                                        <span className="tab-text">결재완료</span>
                                    </li>
                                </NavLink>
                                <NavLink className="tab-item"
                                         to="/approval/approve-approvals/RETURN"
                                         activeClassName="selected-tab">
                                    <li id="tab-hold" className="AP">
                                        <span className="tab-text">반려</span>
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                        <table className="sales-table approval-list-table">
                            <colgroup>
                                <col width="10%"/>
                                <col width="10%"/>
                                <col width="5%"/>
                                <col width="30%"/>
                                <col width="5%"/>
                                <col width="10%"/>
                                <col width="15%"/>
                                <col width="15%"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>결재상태</th>
                                <th>결재양식</th>
                                <th>기안자</th>
                                <th>제목</th>
                                <th>첨부</th>
                                <th>문서번호</th>
                                <th>기안일</th>
                                <th>결재일</th>
                            </tr>
                            </thead>
                            <tbody>
                            { approveAppsBy.data.map(approval => (
                                <tr key={approval.approvalCode}
                                    onClick={() => onClickApproval(approval.approvalCode)}>

                                    <td>{approval.docStatus}</td>
                                    <td>{approval.docForm}</td>
                                    <td>{approval.emplyName}</td>
                                    <td>{approval.title}</td>
                                    <td>{approval.fileCount}</td>
                                    <td>{approval.docNo}</td>
                                    <td>{format(new Date(approval.draftDateTime),'yy-MM-dd') }</td>
                                    <td>{format(new Date(approval.approvalDateTime),'yy-MM-dd') }</td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                        <PagingBar pageInfo={approveAppsBy.pageInfo} setCurrentPage={setCurrentPage}/>
                    </>
                }
            </div>
        </>
    );
}

export default ApproveAppsByStatus;