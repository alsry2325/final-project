package com.playwithcode.businessbridge.address.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RequiredArgsConstructor
@Getter
public class AddressBookUpdateRequest {

    /* 수정이 필요한 데이터 : 사진, 날짜 제외 (수정 날짜 : 서비스, 입사 날짜와 탈퇴 날짜는 수정 필요 X)
    * 이름, 소속, 사번, 이메일, 직위, 부서, 사내번호, 개인번호 */

    @NotNull @NotBlank
    private final String emplyName;
    @NotNull
    private final String emplyOffice;
    @NotNull
    private final String emplyEmail;
    @NotNull
    private final Long departmentCode;
    @NotNull
    private final Long positionCode;
    @NotNull
    private final String emplyPhoneNumber;

    private final String emplyInternalNumber;

}
