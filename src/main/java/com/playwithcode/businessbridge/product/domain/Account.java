package com.playwithcode.businessbridge.product.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.util.Date;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_account")
@NoArgsConstructor(access = PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Account {

    @GeneratedValue(strategy = IDENTITY)
    @Id
    private Long accountCode;//거래처 코드

    private String customerRepresenative;//거래처 대표자

    private String sortation;//구분

    private Long accountNumber;//거래처 전화번호

    private String accountName; //거래처명

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date registrationDate;//등록일

    private String taxInvoiceEmail; //세금계산서 메일

    private Long BusinessLicenseNumber; //사업자 번호

    private Long accountAddress;//사업자주소

    private String specialNote;//특이사항

    private String accountManager; //거래처 담당자

    private Date establishedYear;//설립연도


}
