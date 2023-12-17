package com.playwithcode.businessbridge.member.dto.response;

import com.playwithcode.businessbridge.member.domain.Employee;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class CustomerEmployeesResponse {

    private final Long emplyCode; //사원코드
    private final String emplyPhoto; //사원이미지
    private final String emplyId;
    private final String emplyName;     //사원이름
    private final String emplyOffice;   //소속
    private final String emplyEmail;    //사원이메일
    private final String positionName;    //직급
    private final String departmentName;  //부서
    private final String emplyInternalNumber;  //사내번호
    private final String emplyPhoneNumber;   //사원개인폰

    public static CustomerEmployeesResponse from(Employee employee) {
        return new CustomerEmployeesResponse(
                employee.getEmplyCode(),
                employee.getEmplyPhoto(),
                employee.getEmplyId(),
                employee.getEmplyName(),
                employee.getEmplyOffice(),
                employee.getEmplyEmail(),
                employee.getPosition().getPositionName(),
                employee.getDepartment().getDepartmentName(),
                employee.getEmplyInternalNumber(),
                employee.getEmplyPhoneNumber()
        );
    }
}
