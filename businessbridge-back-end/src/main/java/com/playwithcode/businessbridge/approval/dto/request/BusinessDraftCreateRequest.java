package com.playwithcode.businessbridge.approval.dto.request;

import com.playwithcode.businessbridge.approval.domain.type.DocFormType;
import com.playwithcode.businessbridge.approval.domain.type.DocStatusType;
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
    private final List<Long> approvers;              // 결재자들

    private final DocStatusType docStatus;          // 문서상태(임시저장, 등록)
}
