package com.playwithcode.businessbridge.member.domain.repository;

import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.type.EmplyStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    Optional<Employee> findByEmplyId(String emplyId); //Optional: 있거나 없거나

    Optional<Employee> findByRefreshToken(String refreshToken);

    /* 아이디 중복검사 */
    boolean existsByEmplyId(String emplyId);
    /*이메일  중복검사 */
    boolean existsByEmplyEmail(String emplyEmail);

    /* 전자결재 모달 창 직원 조회 */
    List<Employee> findByEmplyStatus(EmplyStatus emplyStatus);

    /* 사원목록 조회*/
    @Query("SELECT e FROM Employee e " +
            "WHERE e.emplyName LIKE %:emplyName% " +
            "AND e.department.departmentName LIKE %:departmentName% " +
            "AND e.position.positionName LIKE %:positionName% ")
    Page<Employee> findByEmplyNameAndDepartmentNameAndPositionName(Pageable pageable, @Param("emplyName") String emplyName,@Param("departmentName")  String departmentName,@Param("positionName") String positionName);

    Optional<Employee> findByEmplyCode(Long emplyCode);


    @EntityGraph(attributePaths = {"department","position"})
    Page<Employee> findByEmplyStatusNot(Pageable pageable, EmplyStatus emplyStatus);
}
