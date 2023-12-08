package com.playwithcode.businessbridge.approval.dto.response;

import com.playwithcode.businessbridge.approval.domain.Approval;
import com.playwithcode.businessbridge.approval.domain.Approver;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ReceiveListResponse {

    private final Long approverCode;                    // 결재자 코드
    private final String docStatus;                     // 문서 상태
    private final String docForm;                       // 문서 양식
    private final String emplyName;                     // 기안자 이름
    private final String title;                         // 제목
    private final Integer fileCount;                    // 첨부파일
    private final Long DocNo;                            // 문서 번호
    private final LocalDateTime draftDateTime;          // 기안 일시
    private final LocalDateTime approvalDateTime;       // 결재 일시

    private final String approvalStatus;                // 결재 상태
    private final Long approvalCode;                    // 결재 코드

    public static ReceiveListResponse from(final Approval approval){

//        Optional<Approver> approver = approval.getApproverMember().stream().filter(member -> member.getApproverMember() == 1L).findFirst();

        return new ReceiveListResponse(
                approval.getApproverMember().get(0).getApproverCode(),
                approval.getDocStatus().getValue(),
                approval.getDocForm().getValue(),
                approval.getDraftMember().getEmplyName(),
                approval.getTitle(),
                approval.getFile().size(),
                approval.getDocNo(),
                approval.getRegistDateTime(),
                approval.getApproverMember().get(0).getApprovalDateTime(),
                approval.getApproverMember().get(0).getApprovalStatus().getValue(),
                approval.getApprovalCode()
        );
    }
}
