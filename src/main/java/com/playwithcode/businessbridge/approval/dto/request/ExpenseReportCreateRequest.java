package com.playwithcode.businessbridge.approval.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@RequiredArgsConstructor
@Getter
public class ExpenseReportCreateRequest {

    @NotEmpty
    private final List<Long> approverMember;    // 결재자들
    @NotBlank
    private final String title;                 // 제목
    @NotNull
    private final Long totalExpenditure;        // 총지출금액

    private final List<ExpenseReportDetailCreateRequest> expenseReportDetailCreateRequests; // 지출결의서 상세
}
