
package com.playwithcode.businessbridge.member.dto.response;

import com.playwithcode.businessbridge.department.domain.Department;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.position.domain.Position;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class MypageResponse {

    private final String emplyPhoto; //사원이미지
    private final String emplyName;     //사원이름
    private final String emplyOffice;   //소속
    private final String emplyId;       //사번
    private final String emplyEmail;    //사원이메일
    private final String position;    //직급
    private final String department;  //부서
    private final String emplyInternalNumber;  //사내번호
    private final String emplyPhoneNumber;   //사원개인폰
    private final LocalDateTime createdAt;
    private final LocalDateTime retirementDate;

    public static MypageResponse from(Employee employee) {
        return new MypageResponse(
                employee.getEmplyPhoto(),
                employee.getEmplyName(),
                employee.getEmplyOffice(),
                employee.getEmplyId(),
                employee.getEmplyEmail(),
                employee.getPosition().getPositionName(),
                employee.getDepartment().getDepartmentName(),
                employee.getEmplyInternalNumber(),
                employee.getEmplyPhoneNumber(),
                employee.getCreatedAt(),
                employee.getRetirementDate()
        );


    }
}

