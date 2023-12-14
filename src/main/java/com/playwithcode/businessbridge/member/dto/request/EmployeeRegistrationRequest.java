package com.playwithcode.businessbridge.member.dto.request;

import com.playwithcode.businessbridge.department.domain.Department;
import com.playwithcode.businessbridge.position.domain.Position;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


@Getter
@RequiredArgsConstructor
public class EmployeeRegistrationRequest {

    private final String emplyPhoto;  //사원이미지

    @NotBlank(message ="사원이름 입력해주세요.")
    private final String emplyName; //사원이름
    @NotBlank(message ="사원아이디 입력해주세요.")
    @Pattern(regexp = "^[0-9]{4,10}$", message = "아이디는 숫자만 사용하여 4~10자리여야 합니다.")
    private final String emplyId; //사원아이디(사번)

    @NotBlank(message ="사원이메일 입력해주세요.")
    private final String emplyEmail; //사원이메일

    private final Long  departmentCode; //부서코드

    private final Long positionCode; //직급코드

    private final String emplyInternalNumber; //사내번호

    private final String emplyPhoneNumber; //사원개인폰번호


}
