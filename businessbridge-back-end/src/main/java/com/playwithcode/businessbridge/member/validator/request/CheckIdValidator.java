package com.playwithcode.businessbridge.member.validator.request;

import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepository;
import com.playwithcode.businessbridge.member.dto.request.EmployeeRegistrationRequest;
import com.playwithcode.businessbridge.member.validator.AbstractValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@RequiredArgsConstructor
@Component
public class CheckIdValidator extends AbstractValidator<EmployeeRegistrationRequest> {

    private final EmployeeRepository employeeRepository;

    @Override
    protected void doValidate(EmployeeRegistrationRequest dto, Errors errors) {

        if(employeeRepository.existsByEmplyId(dto.getEmplyId())){
            /* 중복인 경우
            * 409 Conflict는 리소스의 충돌을 의미하는 상태코드입니다.
            * ID 중복이라는 것은 결국 ID라는 PK 자원을 점유한 것에 대한 충돌이기 때문에
            * 이 상태코드가 가장 적합하다고 생각하여 409 상태코드*/
            errors.rejectValue("emplyId","403", "이미 사용 중인 아이디입니다.");
        }
    }
}
