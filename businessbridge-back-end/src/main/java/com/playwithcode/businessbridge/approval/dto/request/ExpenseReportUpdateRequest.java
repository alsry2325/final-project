package com.playwithcode.businessbridge.approval.dto.request;

import com.playwithcode.businessbridge.approval.domain.type.DocStatusType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@RequiredArgsConstructor
@Getter
public class ExpenseReportUpdateRequest {

    @NotEmpty
    private final List<Long> approvers;    // 결재자들
    @NotBlank
    private final String title;                 // 제목
    @NotNull
    private final Long totalExpenditure;        // 총지출금액

    private final List<ExpenseReportDetailUpdateRequest> details; // 지출결의서 상세

    private final DocStatusType docStatus;          // 문서 상태
}
