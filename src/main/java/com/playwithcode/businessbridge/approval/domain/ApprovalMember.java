package com.playwithcode.businessbridge.approval.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_employee")
@Getter
public class ApprovalMember {

    @Id
    private Long emplyCode;

    private String emplyName;


    // 첨부파일 추가
}
