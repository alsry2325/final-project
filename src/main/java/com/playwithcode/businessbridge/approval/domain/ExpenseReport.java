package com.playwithcode.businessbridge.approval.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tbl_expense_report")
@NoArgsConstructor
@Getter
public class ExpenseReport {

    @Id
    private Long expenseReportCode;

    @OneToOne
    @JoinColumn(name = "approvalCode")
    private Approval approval;

    @Column(nullable = false)
    private Long totalAmount;

    @OneToMany
    @JoinColumn(name = "expenseReportCode")
    private List<ExpenseReportDetail> expenseReportDetail;
}
