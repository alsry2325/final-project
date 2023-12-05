package com.playwithcode.businessbridge.approval.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@RequiredArgsConstructor
@Getter
public class BusinessDraftCreateRequest {

    @NotBlank
    private final String businessDraftContent;      // 업무 기안서 내용
    @NotBlank
    private final String title;                     // 제목
    @NotEmpty
    private final List<Long> approverMember;        // 결재자들
}
