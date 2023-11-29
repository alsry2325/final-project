package com.playwithcode.businessbridge.member.domain.repository;

import com.playwithcode.businessbridge.member.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepositroy extends JpaRepository<Employee,Long> {

    Optional<Employee> findByEmplyId(String emplyId); //Optional: 있거나 없거나

}
