package com.playwithcode.businessbridge.approval.domain.repository;

import com.playwithcode.businessbridge.approval.domain.Approval;
import com.playwithcode.businessbridge.approval.domain.Approver;
import com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalRepository extends JpaRepository<Approver, Long> {

    /* 1. 받은 결재 목록 조회 */
    Page<Approver> findByApprovalStatus(Pageable pageable, ApprovalStatusType approvalStatusType);
}
