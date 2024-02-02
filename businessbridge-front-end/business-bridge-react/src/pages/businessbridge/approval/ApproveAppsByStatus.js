import {ToastContainer} from "react-toastify";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {format} from "date-fns";
import PagingBar from "../../../components/common/PagingBar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callApproveAppsByStatusAPI} from "../../../apis/ApprovalAPICalls";

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

    // 문서 상태에 따른 조회 스타일
    const getDivStyle = (docStatus) => {
        let style={};

        if(docStatus === '대기'){
            style.backgroundColor = '#F8DA72'
        }
        if(docStatus === '진행중'){
            style.backgroundColor = '#ABD378';
        }
        if(docStatus === '완료'){
            style.backgroundColor = '#989898';
        }
        if(docStatus === '반려'){
            style.backgroundColor = '#FF616B';
        }
        return style;
    }

    return(
        <>
            <ToastContainer position="top-center"/>
            <div className="approval-div">
                <h2 className="approval-title">결재한 문서함</h2>

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
                                         activeclassname="selected-tab">
                                    <li id="tab-hold" className="AP">
                                        <span className="tab-text">진행중</span>
                                    </li>
                                </NavLink>

                                <NavLink className="tab-item"
                                         to="/approval/approve-approvals/COMPLETE"
                                         activeclassname="selected-tab">
                                    <li id="tab-hold" className="AP">
                                        <span className="tab-text">완료</span>
                                    </li>
                                </NavLink>
                                <NavLink className="tab-item"
                                         to="/approval/approve-approvals/RETURN"
                                         activeclassname="selected-tab">
                                    <li id="tab-hold" className="AP">
                                        <span className="tab-text">반려</span>
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                {
                    approveAppsBy && approveAppsBy.data.length > 0 ? (
                    <>
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

                                    <td>
                                        <div className="docStatus-div" style={getDivStyle(approval.docStatus)}>
                                            {approval.docStatus}
                                        </div>
                                    </td>
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
                    ) : (
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
                                <tr>
                                    <td colSpan={8}>
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

export default ApproveAppsByStatus;