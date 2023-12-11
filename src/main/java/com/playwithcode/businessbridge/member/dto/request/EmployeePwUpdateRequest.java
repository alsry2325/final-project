package com.playwithcode.businessbridge.member.dto.request;

import com.playwithcode.businessbridge.member.domain.type.TmpryPwdStus;
import lombok.Getter;


import javax.validation.constraints.NotBlank;


@Getter
public class EmployeePwUpdateRequest {

    @NotBlank
    private String emplyPassword;
    private TmpryPwdStus tmpryPwdStus;
}
