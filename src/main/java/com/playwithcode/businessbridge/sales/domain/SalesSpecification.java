package com.playwithcode.businessbridge.sales.domain;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;


public class SalesSpecification {

    //진행도 검색
    public static Specification<Sales> equalSalesStatus(String salesStatus) {
        return new Specification<Sales>() {
            private static final long serialVersionUID = 1L;

            @Override
            public Predicate toPredicate(Root<Sales> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                // 1) equal
                return criteriaBuilder.equal(root.get("salesStatus"), salesStatus);
            }
        };
    }

    //영업명 검색
    public static Specification<Sales> likeSalesName(String salesName) {
        return new Specification<Sales>() {
            private static final long serialVersionUID = 1L;
            @Override
            public Predicate toPredicate(Root<Sales> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                // 2) like
                return criteriaBuilder.like(root.get("salesName"), "%" + salesName + "%");
            }
        };
    }

    //거래처명 검색
    public static Specification<Sales> likeAccountName(String accountName) {
        return new Specification<Sales>() {
            private static final long serialVersionUID = 1L;
            @Override
            public Predicate toPredicate(Root<Sales> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                // 2) like
                return criteriaBuilder.like(root.get("accountName"), "%" + accountName + "%");
            }
        };
    }

}

