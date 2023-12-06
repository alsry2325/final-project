package com.playwithcode.businessbridge.member.service;

import com.playwithcode.businessbridge.approval.dto.response.AllEmployeeResponse;
import com.playwithcode.businessbridge.common.exception.BadRequestException;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepository;
import com.playwithcode.businessbridge.member.dto.response.MypageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.NOT_FOUND_MEMBER_ID;
import static com.playwithcode.businessbridge.member.domain.type.EmplyStatus.JOIN;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final EmployeeRepository employeeRepository;

   @Transactional(readOnly = true)
    public MypageResponse getMyPage(String emplyId) {

            final Employee employee = employeeRepository.findByEmplyId(emplyId)
                    .orElseThrow(()->new BadRequestException(NOT_FOUND_MEMBER_ID));

            return  MypageResponse.from(employee);
    }

    /* 전자결재 모달 창 직원 조회 */
    @Transactional(readOnly = true)
    public List<AllEmployeeResponse> getAllEmployeeList() {

        List<Employee> employees = employeeRepository.findByEmplyStatus(JOIN);

        return employees.stream().map(AllEmployeeResponse::from).collect(Collectors.toList());
    }
}
