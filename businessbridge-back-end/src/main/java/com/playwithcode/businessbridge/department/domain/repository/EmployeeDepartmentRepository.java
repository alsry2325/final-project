package com.playwithcode.businessbridge.department.domain.repository;

import com.playwithcode.businessbridge.department.domain.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDepartmentRepository extends JpaRepository<Department, Long> {

}
