package com.playwithcode.businessbridge.approval.domain;

import com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType;
import com.playwithcode.businessbridge.member.domain.Employee;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_approver")
@NoArgsConstructor(access = PROTECTED)
@Getter
public class Approver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long approverCode;                  // 결재자 코드(PK)

    @ManyToOne
    @JoinColumn(name = "approverMember")
    private Employee approverMember;           // 결재자의 사원 코드

    private LocalDateTime approvalDateTime;     // 결재 일시

    private String approvalOpinion;             // 결재 의견

    private LocalDateTime returnDateTime;       // 반려 일시

    private String ReturnOpinion;               // 반려 의견

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private ApprovalStatusType approvalStatus;  // 결재 상태
    // 대기(WAITING), 활성화(ACTIVATE), 완료(COMPLETE), 반려(RETURN)

    @Column(nullable = false)
    private Long approvalOrder;                 // 결재 순번

    public Approver(Employee approverMember, Long approvalOrder, ApprovalStatusType approvalStatus) {
        this.approverMember = approverMember;
        this.approvalOrder = approvalOrder;
        this.approvalStatus  =approvalStatus;
    }


    public static Approver of(Employee approverMember, Long approvalOrder, ApprovalStatusType approvalStatus) {
        return new Approver(
                approverMember, approvalOrder, approvalStatus
        );
    }
}
