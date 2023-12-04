package com.playwithcode.businessbridge.product.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_employee")
@NoArgsConstructor(access = PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Employee {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long emplyCode;//사원코드

    private String emplyId;//아이디(사번)

    private String emplyPassword;//비밀번호

    private String emplyName;//이름

    private String emplyPhoneNumber;//전화번호

    private String emplyEmail;//이메일

    private String emplyInternalNumber;//사내번호

    private Long departmentCode;//부서코드

    private Long positionCode;//직급코드


    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date createdAt;//입사일

    private String emplyPhoto;//사원사진

    @LastModifiedDate
    @Column(nullable = false)
    private Date modifiedAt;//수정일

    private String emplyStatus;//상태

    private String emplyOffice;//소속

    private String tmpryPwdStus;//임시비밀번호 여부

    private String emplyRole;//권한

    private Date retirementDate;//퇴사일

    private String refreshToken;//리프레시 토큰









}
