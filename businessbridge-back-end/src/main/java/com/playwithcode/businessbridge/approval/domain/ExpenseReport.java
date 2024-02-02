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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expenseReportCode;                             // 지출 결의서 코드

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "approvalCode")
    private Approval approval;                                  // 전자결재코드

    @Column(nullable = false)
    private Long totalExpenditure;                              // 총지출금액

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "expenseReportCode")
    private List<ExpenseReportDetail> expenseReportDetail;      // 지출 상세

    public ExpenseReport(Approval approval, Long totalExpenditure, List<ExpenseReportDetail> expenseReportDetail) {
        this.approval = approval;
        this.totalExpenditure = totalExpenditure;
        this.expenseReportDetail = expenseReportDetail;
    }

    public static ExpenseReport of(Approval approval, Long totalExpenditure, List<ExpenseReportDetail> expenseReportDetail){
        return new ExpenseReport(
                approval, totalExpenditure, expenseReportDetail
        );
    }

    public void update(Long totalExpenditure){
        this.totalExpenditure = totalExpenditure;
    }
}
