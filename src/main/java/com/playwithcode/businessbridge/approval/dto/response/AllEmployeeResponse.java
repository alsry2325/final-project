package com.playwithcode.businessbridge.approval.dto.response;

import com.playwithcode.businessbridge.member.domain.Employee;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class AllEmployeeResponse {

    private final String departmentName;        // 부서명
    private final String emplyName;             // 직원이름
    private final String positionName;          // 직급명

    public static AllEmployeeResponse from(final Employee employee){
        return new AllEmployeeResponse(
                employee.getDepartment().getDepartmentName(),
                employee.getEmplyName(),
                employee.getPosition().getPositionName()
        );
    }
}
