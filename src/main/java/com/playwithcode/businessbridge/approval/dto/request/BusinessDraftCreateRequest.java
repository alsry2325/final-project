package com.playwithcode.businessbridge.approval.dto.request;

import com.playwithcode.businessbridge.approval.domain.Approver;
import com.playwithcode.businessbridge.member.domain.Employee;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@RequiredArgsConstructor
@Getter
public class BusinessDraftCreateRequest {


    @NotBlank
    private final String businessDraftContent;
    @NotBlank
    private final String title;
    @NotEmpty
    private final List<Long> approverMember;
//    private final List<Approver> approverMember;


}
