package com.playwithcode.businessbridge.member.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class EmployeePwUpdateRequest {

    @NotBlank
    private String emplyPassword;
}
