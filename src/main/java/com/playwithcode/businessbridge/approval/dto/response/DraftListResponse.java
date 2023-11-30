package com.playwithcode.businessbridge.approval.dto.response;

import com.playwithcode.businessbridge.approval.domain.Approval;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;

@RequiredArgsConstructor(access = PRIVATE)
@Getter
public class DraftListResponse {

    private final String docStatus;                 // 결재 상태
    private final String docForm;                   // 문서 양식
    private final String title;                     // 제목
    private final Integer fileCount;                  // 첨부파일
    private final Long docNo;                       //문서번호
    private final LocalDateTime draftDateTime;      // 기안일

    public static DraftListResponse from(final Approval approval){

        return new DraftListResponse(
                approval.getDocStatus().getValue(),
                approval.getDocForm().getValue(),
                approval.getTitle(),
                approval.getFile().size(),
                approval.getDocNo(),
                approval.getDraftDateTime()
        );
    }
}
