package com.playwithcode.businessbridge.approval.domain.repository;

import com.playwithcode.businessbridge.approval.domain.BusinessDraft;
import com.playwithcode.businessbridge.approval.domain.type.DocFormType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusinessDraftRepository extends JpaRepository<BusinessDraft, Long> {

    /* -------------------------------------------------- 상세 조회 -------------------------------------------------- */

    /* 8. 업무기안서 상세 조회 */
    Optional<BusinessDraft> findApprovalByApprovalApprovalCodeAndApprovalDocFormLike(Long approvalCode, DocFormType docFormType);
}
