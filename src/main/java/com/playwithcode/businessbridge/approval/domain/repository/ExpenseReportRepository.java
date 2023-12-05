package com.playwithcode.businessbridge.approval.domain.repository;

import com.playwithcode.businessbridge.approval.domain.ExpenseReport;
import com.playwithcode.businessbridge.approval.domain.type.DocFormType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExpenseReportRepository extends JpaRepository<ExpenseReport, Long> {

    /* 9. 지출결의서 상세 조회 */
    Optional<ExpenseReport> findByApprovalApprovalCodeAndApprovalDocFormLike(Long approvalCode, DocFormType docFormType);


}
