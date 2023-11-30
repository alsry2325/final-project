package com.playwithcode.businessbridge.address.domain;

import com.playwithcode.businessbridge.department.domain.Department;
import com.playwithcode.businessbridge.member.domain.type.EmplyRole;
import com.playwithcode.businessbridge.member.domain.type.EmplyStatus;
import com.playwithcode.businessbridge.position.domain.Position;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.time.LocalDateTime;

import static com.playwithcode.businessbridge.member.domain.type.EmplyStatus.JOIN;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "tbl_employee")
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class AddressBook {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long emplyCode;

    @Column(nullable = false)
    private String emplyId;

    @Column(nullable = false)
    private String emplyName;

    private String emplyPhoneNumber;

    private String emplyEmail;

    private String emplyInternalNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departmentCode")
    private Department department;      //부서코드

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "positionCode")
    private Position position;      //직급코드

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;    //입사일

    @Column(nullable = false)
    private String emplyPhoto;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt;   //수정일

    @Enumerated(value = STRING)
    @Column(nullable = false)
    private EmplyStatus emplyStatus = JOIN;

    private  String emplyOffice;        //소속

    private String emplyRole;                        //권한

    private  LocalDateTime retirementDate;              //퇴사일

    private  String refreshToken;

    /* 프로필 수정 로직 */

    public void updateEmplyPhoto(String emplyPhoto) {
        this.emplyPhoto = emplyPhoto;
    }

    public void update(String emplyName, String emplyOffice, String emplyEmail,
                       Department department, Position position, String emplyPhoneNumber,
                       String emplyInternalNumber) {
        this.emplyName = emplyName;
        this.emplyOffice = emplyOffice;
        this.emplyEmail = emplyEmail;
        this.department = department;
        this. position = position;
        this.emplyPhoneNumber = emplyPhoneNumber;
        this.emplyInternalNumber = emplyInternalNumber;
    }

}
