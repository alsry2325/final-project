import {ToastContainer} from "react-toastify";
import PagingBar from "../../components/common/PagingBar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {callUpcomingApprovalsListAPI} from "../../apis/ApprovalAPICalls";
import { format } from 'date-fns';

function UpcomingApps() {

    const {approvalStatus} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { upcomingApps } = useSelector(state => state.approvalReducer);   //모듈에 정의한 key값
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callUpcomingApprovalsListAPI({currentPage}));
    }, [currentPage]);

    const onClickApproval = (approvalCode) => {
        navigate(`/approval/document/${approvalCode}`);
    }

    return(
        <>
            <ToastContainer position="top-center"/>
            <div className="approval-div">
                <h2 className="approval-title">결재 예정 문서</h2>
                {
                    upcomingApps &&
                    <>
                        <table className="sales-table approval-list-table">
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
                            { upcomingApps.data.map(upApproval => (
                                <tr key={upApproval.approvalCode}
                                    onClick={() => onClickApproval(upApproval.approvalCode)}>

                                    <td>{upApproval.docForm}</td>
                                    <td>{upApproval.emplyName}</td>
                                    <td>{upApproval.title}</td>
                                    <td>{upApproval.fileCount}</td>
                                    <td>{format(new Date(upApproval.draftDateTime),'yy-MM-dd') }</td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                        <PagingBar pageInfo={upcomingApps.pageInfo} setCurrentPage={setCurrentPage}/>
                    </>
                }
            </div>
        </>
    );
}

export default UpcomingApps;