package com.playwithcode.businessbridge.member.domain;


import com.playwithcode.businessbridge.department.domain.Department;
import com.playwithcode.businessbridge.member.domain.type.EmplyRole;
import com.playwithcode.businessbridge.member.domain.type.EmplyStatus;
import com.playwithcode.businessbridge.member.domain.type.TmpryPwdStus;
import com.playwithcode.businessbridge.position.domain.Position;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.time.LocalDateTime;

import static com.playwithcode.businessbridge.member.domain.type.EmplyStatus.JOIN;
import static com.playwithcode.businessbridge.member.domain.type.TmpryPwdStus.TEMPORARY;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_employee")
@Getter
@NoArgsConstructor(access = PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Employee {

    @Id
    @GeneratedValue(strategy = IDENTITY) //MYSQL을 쓸때 PK하나씩 자동으로 생성
    private Long emplyCode;  //사원코드

    @Column(nullable = false)
    private String emplyId;  //사원아이디
    @Column(nullable = false)
    private String emplyPassword; //사원비밀번호
    @Column(nullable = false)
    private String emplyName; //사원이름

    private String emplyPhoneNumber; //사원개인폰번호

    private String emplyEmail; //사원이메일

    private String emplyInternalNumber; //사내번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departmentCode")
    private Department department;  //부서코드

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "positionCode")
    private Position position; //직급코드

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt; //입사일

    private String emplyPhoto;  //사원이미지

    @LastModifiedDate
    @Column(nullable = false)
    private String modifiedAt; //수정일
    @Enumerated(value = STRING)
    @Column(nullable = false)
    private EmplyStatus emplyStatus = JOIN; //사원상태

    private  String emplyOffice; //소속
    @Enumerated(value = STRING)
    @Column(nullable = false)
    private TmpryPwdStus tmpryPwdStus= TEMPORARY ; //임시번호상태
    @Enumerated(value = STRING)
    @Column(nullable = false)
    private EmplyRole emplyRole; //권한

    private  LocalDateTime retirementDate; //퇴사일

    private  String refreshToken; //리프레쉬토큰
 }
