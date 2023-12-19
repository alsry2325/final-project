import {format} from "date-fns";
import {useNavigate} from "react-router-dom";

function InProgressListItem({approval : {approvalCode, docStatus, title, emplyName, draftDateTime, docForm}}){

    const navigate = useNavigate();

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

     const onClickApprove = (approvalCode) => {
         navigate(`/approval/document/${approvalCode}`)
     }

    return(
        <>
            <div className="in-progress-approval-div">
                {/* 진행상태, 제목, 기안자, 기안일, 결재양식, 결재버튼 */}
                <div className="IP-docStatus docStatus-div" style={getDivStyle(docStatus)}>
                    {docStatus}
                </div>
                <div className="IP-title">{title}</div>
                <div className="IP-drafter">기안자 : {emplyName}</div>
                <div className="IP-draftTime">기안일 : {format(new Date(draftDateTime),'yy-MM-dd') }</div>
                <div className="IP-docForm">결재양식 : {docForm}</div>
                <div
                    onClick={onClickApprove(approvalCode)}
                    className="IP-approve bob-on-hover">결재하기
                </div>
            </div>
        </>
    );
 }

 export default InProgressListItem;