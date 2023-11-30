package com.playwithcode.businessbridge.approval.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ReceiveListResponse {

    private final String docStatus;
    private final String docForm;
    private final String emplyName;
    private final String title;
    private final Integer fileCount;
    private final Long DocNo;
    private final LocalDateTime draftDateTime;
    private final LocalDateTime approvalDateTime;
}
