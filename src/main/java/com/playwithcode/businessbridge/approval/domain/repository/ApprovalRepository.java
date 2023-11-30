package com.playwithcode.businessbridge.approval.domain.repository;

import com.playwithcode.businessbridge.approval.domain.Approval;
import com.playwithcode.businessbridge.approval.domain.Approver;
import com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType;
import com.playwithcode.businessbridge.approval.domain.type.DocStatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalRepository extends JpaRepository<Approval, Long> {

    /* 2. 기안한 결재 목록 조회 */
    Page<Approval> findByDraftMemberEmplyCodeAndDocStatus(Pageable pageable, Long emplyCode, DocStatusType docStatus );
}
