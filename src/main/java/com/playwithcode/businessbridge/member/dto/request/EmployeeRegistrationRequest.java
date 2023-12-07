package com.playwithcode.businessbridge.member.dto.request;

import com.playwithcode.businessbridge.department.domain.Department;
import com.playwithcode.businessbridge.position.domain.Position;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import javax.validation.constraints.NotBlank;


@Getter
@RequiredArgsConstructor
public class EmployeeRegistrationRequest {

    private final String emplyPhoto;  //사원이미지

    @NotBlank
    private final String emplyName; //사원이름
    @NotBlank
    private final String emplyId; //사원아이디(사번)

    @NotBlank
    private final String emplyEmail; //사원이메일

    private final Long  departmentCode; //부서코드

    private final Long positionCode; //직급코드

    private final String emplyInternalNumber; //사내번호

    private final String emplyPhoneNumber; //사원개인폰번호


}
