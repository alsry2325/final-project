package com.playwithcode.businessbridge.approval.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tbl_expense_report_detail")
@NoArgsConstructor
@Getter
public class ExpenseReportDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expenseDetailCode;         // 지출 결의 상세 코드

    @Column(nullable = false)
    private String item;                    // 적요

    @Column(nullable = false)
    private Long amount;                    // 금액

    private String note;                    // 비고

    public ExpenseReportDetail(String item, Long amount, String note) {
        this.item = item;
        this.amount = amount;
        this.note = note;
    }

    public static ExpenseReportDetail of(String item, Long amount, String note){
        return new ExpenseReportDetail(
                item, amount, note
        );
    }

    public void update(String item, Long amount, String note){
        this.item = item;
        this.amount = amount;
        this.note = note;
    }
}
