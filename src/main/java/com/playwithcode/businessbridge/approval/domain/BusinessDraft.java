package com.playwithcode.businessbridge.approval.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tbl_business_draft")
@NoArgsConstructor
@Getter
public class BusinessDraft {

    @Id
    private Long businessDraftCode;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "approvalCode")
    private Approval approval;

    @Column(nullable = false)
    private String businessDraftContent;

    public BusinessDraft(Approval approval, String businessDraftContent) {
        this.approval = approval;
        this.businessDraftContent = businessDraftContent;
    }

    public static BusinessDraft of(Approval approval, String businessDraftContent) {
        return new BusinessDraft(
                approval, businessDraftContent
        );
    }
}
