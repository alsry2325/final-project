package com.playwithcode.businessbridge.approval.dto.response;

import com.playwithcode.businessbridge.approval.domain.Approval;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;

@RequiredArgsConstructor(access = PRIVATE)
@Getter
public class ReceivedApprovalResponse {

    private final String docForm;
    private final String emplyName;
    private final String title;
    // 첨부파일
    private final LocalDateTime draftDateTime;

    public static ReceivedApprovalResponse from(final Approval approval){

        return new ReceivedApprovalResponse(
                approval.getDocForm().getValue(),
                approval.getDraftMember().getEmplyName(),
                approval.getTitle(),
                approval.getDraftDateTime()
        );
    }
}
