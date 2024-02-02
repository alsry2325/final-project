package com.playwithcode.businessbridge.approval.dto.request;

import com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class ApproveRequest {
    // 결재자가 결재를 할 때(승인하거나 반려할 때)

    private final ApprovalStatusType approvalStatus;        // 결재 상태

    private final String approvalOpinion;                   // 결재 의견

}
