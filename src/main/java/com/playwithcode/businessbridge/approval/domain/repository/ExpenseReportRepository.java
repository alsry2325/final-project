package com.playwithcode.businessbridge.approval.domain.repository;

import com.playwithcode.businessbridge.approval.domain.ExpenseReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseReportRepository extends JpaRepository<ExpenseReport, Long> {
}
