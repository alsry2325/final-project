package com.playwithcode.businessbridge.member.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public class EmployeeUpdateRequest {


    private final Long departmentCode;  //부서
    private final Long positionCode;    //직급
}
