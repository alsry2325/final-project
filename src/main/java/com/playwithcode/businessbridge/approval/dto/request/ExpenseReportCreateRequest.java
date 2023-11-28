package com.playwithcode.businessbridge.approval.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@RequiredArgsConstructor
@Getter
public class ExpenseReportCreateRequest {

    @NotEmpty
    private final List<Long> approverMember;    // 결재자들
    @NotBlank
    private final String title;                 // 제목
    @NotBlank
    private final Long totalExpenditure;        // 총지출금액
    @NotEmpty
    private final List<String> item;            // 적요
    @NotEmpty
    private final List<Long> amount;            // 금액

    private final List<String> note;            // 비고

}
