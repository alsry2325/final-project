package com.playwithcode.businessbridge.address.domain.repository;

import com.playwithcode.businessbridge.address.domain.AddressBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressBookRepository extends JpaRepository<AddressBook, Long> {
    /* 1. 직원 전체 조회 */
    Page<AddressBook> findAll(Pageable pageable);

    /* 2. 부서별 직원 조회 */
    Page<AddressBook> findByDepartmentDepartmentCode(Pageable pageable, Long departmentCode);

    /* 3. 직원 상세 조회 */
    Optional<AddressBook> findByEmplyCode(Long emplyCode);

}

