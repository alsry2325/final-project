import {ToastContainer} from "react-toastify";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {format} from "date-fns";
import PagingBar from "../../../components/common/PagingBar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callDraftAppsAPI} from "../../../apis/ApprovalAPICalls";

function DraftApps() {

    const {docStatus} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { draftApps } = useSelector(state => state.approvalReducer);   //모듈에 정의한 key값
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callDraftAppsAPI({currentPage, docStatus}));
    }, [currentPage, docStatus]);

    const onClickApproval = (approvalCode) => {
        navigate(`/approval/document/${approvalCode}`);
    }

    return(
        <>
            <ToastContainer position="top-center"/>
            <div className="approval-div">
                <h2 className="approval-title">기안 문서함</h2>
                {
                    draftApps &&
                    <>
                        <div className="approval-tool-bar">
                            <ul className="tab-nav">
                                <NavLink className="tab-item"
                                         to="/approval/draft-approvals/all">
                                    <li id="tab-all" className="first"
                                        style={{borderBottom:"solid 2px", color:'#000000',
                                                fontWeight:'bolder'}}>
                                        <span>전체</span>
                                    </li>
                                </NavLink>
                                <NavLink className="tab-item"
                                         to="/approval/draft-approvals/PROCEEDING"
                                         activeclassname="selected-tab">
                                    <li id="tab-hold" className="AP">
                                        <span className="tab-text">진행중</span>
                                    </li>
                                </NavLink>

                                <NavLink className="tab-item"
                                         to="/approval/draft-approvals/COMPLETE"
                                         activeclassname="selected-tab">
                                    <li id="tab-hold" className="AP">
                                        <span className="tab-text">결재완료</span>
                                    </li>
                                </NavLink>
                                <NavLink className="tab-item"
                                         to="/approval/draft-approvals/RETURN"
                                         activeclassname="selected-tab">
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
                                <col width="40%"/>
                                <col width="10%"/>
                                <col width="15%"/>
                                <col width="15%"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>결재상태</th>
                                <th>결재양식</th>
                                <th>제목</th>
                                <th>첨부</th>
                                <th>문서번호</th>
                                <th>기안일</th>
                            </tr>
                            </thead>
                            <tbody>
                            { draftApps.data.map(approval => (
                                <tr key={approval.approvalCode}
                                    onClick={() => onClickApproval(approval.approvalCode)}>

                                    <td>{approval.docStatus}</td>
                                    <td>{approval.docForm}</td>
                                    <td>{approval.title}</td>
                                    <td>{approval.fileCount}</td>
                                    <td>{approval.docNo}</td>
                                    <td>{format(new Date(approval.draftDateTime),'yy-MM-dd') }</td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                        <PagingBar pageInfo={draftApps.pageInfo} setCurrentPage={setCurrentPage}/>
                    </>
                }
            </div>
        </>
    );
}

export default DraftApps;