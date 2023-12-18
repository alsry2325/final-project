package com.playwithcode.businessbridge.account.domain;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.playwithcode.businessbridge.department.domain.Department;
import com.playwithcode.businessbridge.member.domain.Employee;

public class AccountSpecification {

    //대표자 검색
    public static Specification<Account> likeCustomerRepresentative(String customerRepresentative) {
        return new Specification<Account>() {
            private static final long serialVersionUID = 1L;
            @Override
            public Predicate toPredicate(Root<Account> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                // 2) like
                return criteriaBuilder.like(root.get("customerRepresentative"), "%" + customerRepresentative + "%");
            }
        };
    }

    //거래처명 검색
    public static Specification<Account> likeAccountName(String accountName) {
        return new Specification<Account>() {
            private static final long serialVersionUID = 1L;
            @Override
            public Predicate toPredicate(Root<Account> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                // 2) like
                return criteriaBuilder.like(root.get("accountName"), "%" + accountName + "%");
            }
        };
    }

    //본인 부서
    public static Specification<Account> equalDepartmentCode(Integer departmentCode) {
        return (Specification<Account>) (root, query, builder) -> {
            if (departmentCode == null) {
                return null;
            }
            Join<Account, Employee> empJoin = root.join("employee", JoinType.INNER); // 회원과 조인 emplyCOde 기준
            Join<Employee, Department> deptJoin = empJoin.join("department", JoinType.INNER); // 부서와 조인 (departmentCode 기준)
            return builder.equal(deptJoin.get("departmentCode"), departmentCode); // 부서 코드 일치 조건
        };
    }
    
}

