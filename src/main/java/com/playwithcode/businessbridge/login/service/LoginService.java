package com.playwithcode.businessbridge.login.service;

import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {


    private  final EmployeeRepository employeeRepository;
    @Override
    public UserDetails loadUserByUsername(String emplyId) throws UsernameNotFoundException {

        Employee employee = employeeRepository.findByEmplyId(emplyId)
                .orElseThrow(()->new UsernameNotFoundException("해당 아이디가 존재하지 않습니다!"));

        return User.builder()  //디비에서 조회한 유저이름,패스워드,역할을 셋팅 해서 반환
                .username(employee.getEmplyId())
                .password(employee.getEmplyPassword())
                .roles(employee.getEmplyRole().name())
                .build();
    }
}
