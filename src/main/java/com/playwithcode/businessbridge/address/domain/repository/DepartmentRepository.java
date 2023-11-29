package com.playwithcode.businessbridge.address.domain.repository;

import com.playwithcode.businessbridge.department.domain.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
