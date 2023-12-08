package com.playwithcode.businessbridge.member.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
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

import static com.playwithcode.businessbridge.member.domain.type.EmplyRole.USER;
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
    private LocalDateTime modifiedAt; //수정일
    @Enumerated(value = STRING)
    @Column(nullable = false)
    private EmplyStatus emplyStatus = JOIN; //사원상태

    private  String emplyOffice="(주)비즈니스브릿지"; //소속
    @Enumerated(value = STRING)
    @Column(nullable = false)
    private TmpryPwdStus tmpryPwdStus= TEMPORARY ; //임시번호상태

    @Enumerated(value = STRING)
    @Column(nullable = false)
    private EmplyRole emplyRole = USER; //권한

    private  LocalDateTime retirementDate; //퇴사일

    private  String refreshToken; //리프레쉬토큰



    public Employee(String emplyId, String emplyPassword, String emplyName, String emplyPhoneNumber, String emplyEmail, String emplyInternalNumber, Department department, Position position, String emplyPhoto) {
        this.emplyId = emplyId;
        this.emplyPassword = emplyPassword;
        this.emplyName = emplyName;
        this.emplyPhoneNumber = emplyPhoneNumber;
        this.emplyEmail = emplyEmail;
        this.emplyInternalNumber = emplyInternalNumber;
        this.department = department;
        this.position = position;
        this.emplyPhoto = emplyPhoto;
    }

    public static Employee of(
            final String emplyId,
            final String emplyPassword,
            final String emplyName,
            final String emplyPhoneNumber,
            final String emplyEmail,
            final String emplyInternalNumber,
            final Department department,
            final Position position,
            final String emplyPhoto
    ) {

      return new Employee(
              emplyId,
              emplyPassword,
              emplyName,
              emplyPhoneNumber,
              emplyEmail,
              emplyInternalNumber,
              department,
              position,
              emplyPhoto
        );
    }

    public void updateRefreshToken(String refreshToken) {
        //기존에 있던걸 변경
        this.refreshToken = refreshToken;
    }

    public void updatePassword(String pw) {
        this.emplyPassword = pw;
    }
}
