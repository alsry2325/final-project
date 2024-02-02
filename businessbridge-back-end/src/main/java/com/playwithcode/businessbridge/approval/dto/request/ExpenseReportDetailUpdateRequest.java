package com.playwithcode.businessbridge.approval.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RequiredArgsConstructor
@Getter
public class ExpenseReportDetailUpdateRequest {

    @NotBlank
    private final String item;            // 적요
    @NotNull
    private final Long amount;            // 금액

    private final String note;            // 비고
}
