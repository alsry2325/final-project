package com.playwithcode.businessbridge.member.service;

import com.playwithcode.businessbridge.common.exception.BadRequestException;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepository;
import com.playwithcode.businessbridge.member.dto.response.MypageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.NOT_FOUND_MEMBER_ID;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final EmployeeRepository employeeRepositroy;

   @Transactional(readOnly = true)
    public MypageResponse getMyPage(String emplyId) {

            final Employee employee = employeeRepositroy.findByEmplyId(emplyId)
                    .orElseThrow(()->new BadRequestException(NOT_FOUND_MEMBER_ID));

            return  MypageResponse.from(employee);
    }
}
