package com.playwithcode.businessbridge.approval.dto.response;

import com.playwithcode.businessbridge.approval.domain.Approval;
import com.playwithcode.businessbridge.approval.domain.Approver;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ReceiveListResponse {

    private final String docStatus;                     // 문서 상태
    private final String docForm;                       // 문서 양식
    private final String emplyName;                     // 기안자 이름
    private final String title;                         // 제목
    private final Integer fileCount;                    // 첨부파일
    private final Long DocNo;                           // 문서 번호
    private final LocalDateTime draftDateTime;          // 기안 일시
    private final LocalDateTime approvalDateTime;       // 결재 일시

    public static ReceiveListResponse from(final Approval approval){

        return new ReceiveListResponse(
                approval.getDocStatus().getValue(),
                approval.getDocForm().getValue(),
                approval.getDraftMember().getEmplyName(),
                approval.getTitle(),
                approval.getFile().size(),
                approval.getDocNo(),
                approval.getDraftDateTime(),
                approval.getApproverMember().get(0).getApprovalDateTime()
                // 로그인 한 결재자가 결재한 일시를 입력하고싶다면 get()에서 어떻게 적어야할쥐
        );
    }
}
