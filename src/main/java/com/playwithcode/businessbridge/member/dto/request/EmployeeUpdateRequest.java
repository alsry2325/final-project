package com.playwithcode.businessbridge.member.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@RequiredArgsConstructor
public class EmployeeUpdateRequest {


    private final String emplyPhoto; //사원이미지
    private final String emplyName;     //사원이름
    private final String emplyOffice;   //소속
    private final String emplyEmail;    //사원이메일
    private final Long positionCode;    //직급
    private final Long departmentCode;  //부서
    private final String emplyInternalNumber;  //사내번호
    private final String emplyPhoneNumber;   //사원개인폰

}
