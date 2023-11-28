package com.playwithcode.businessbridge.approval.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_expense_report_detail")
@NoArgsConstructor
@Getter
public class ExpenseReportDetail {

    @Id
    private Long expenseDetailCode;

    @Column(nullable = false)
    private String item;
    @Column(nullable = false)
    private Long amount;

    private String note;
}
