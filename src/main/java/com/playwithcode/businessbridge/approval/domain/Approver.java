package com.playwithcode.businessbridge.approval.domain;

import com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType;
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
    private Long approverCode;                // 결재자 코드(PK)

    @ManyToOne
    @JoinColumn(name = "approverMember")
    private ApprovalMember approverMember;      // 결재자

    private LocalDateTime approvalDateTime;     // 결재 일시

    private String approvalOpinion;             // 결재 의견

    private LocalDateTime returnDateTime;       // 반려 일시

    private String ReturnOpinion;               // 반려 의견

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private ApprovalStatusType status = ApprovalStatusType.WAITING; // 결재 상태
    // 대기(WAITING), 활성화(ACTIVATE), 완료(COMPLETE), 반려(RETURN)

    @Column(nullable = false)
    private Long approvalOrder;                 // 결재 순번

    public Approver(ApprovalMember approverMember, Long approvalOrder, ApprovalStatusType status) {
        this.approverMember = approverMember;
        this.approvalOrder = approvalOrder;
        this.status  =status;
    }

    public static Approver of(ApprovalMember approverMember, Long approvalOrder, ApprovalStatusType status) {
        return new Approver(
                approverMember, approvalOrder, status
        );
    }
}
