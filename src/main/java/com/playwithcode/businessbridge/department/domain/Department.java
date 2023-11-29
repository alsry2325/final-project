package com.playwithcode.businessbridge.department.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED) //기본생성자
@Getter
@Table(name = "tbl_department")
public class Department {

    @Id
    @GeneratedValue(strategy = IDENTITY) //MYSQL을 쓸때 PK하나씩 자동으로 생성
    private Long  departmentCode;  //부서코드
    @Column(nullable = false)
    private String departmentName;  //부서이름
    @Column
    private Long  upperDepartmentCode;  //상위부서
}
