package com.playwithcode.businessbridge.address.domain.repository;

import com.playwithcode.businessbridge.address.domain.AddressBook;
import com.playwithcode.businessbridge.member.domain.type.EmplyStatus;
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

    /* 4. 직원 수정(관리자) */

    /* 5. 직원 삭제(관리자) */

    /* 6. 직원 조회 - 이름 기준 */
    Page<AddressBook> findByEmplyNameContainsAndEmplyStatus(Pageable pageable, String emplyName, EmplyStatus emplyStatus);

    /* 7. 직원 조회 - 이메일 기준 */
    Page<AddressBook> findByEmplyEmailContainsAndEmplyStatus(Pageable pageable, String emplyName, EmplyStatus emplyStatus);

    /* 8. 직원 조회 - 핸드폰 기준 */
    Page<AddressBook> findByEmplyPhoneNumberContainsAndEmplyStatus(Pageable pageable, String emplyPhoneNumber, EmplyStatus emplyStatus);

}

