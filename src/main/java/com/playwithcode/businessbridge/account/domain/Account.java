package com.playwithcode.businessbridge.account.domain;

import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.product.domain.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity(name = "AccountEntity")
@Table(name = "tbl_account")
@NoArgsConstructor(access = PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
@ToString
public class Account {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long accountCode;				//거래처코드

    @Column(nullable = false)
    private String customerRepresentative;	//거래처 대표

    @Column(nullable = false)
    private String accountNumber;			//거래처연락처
    
    @Column(nullable = false)
    private String accountName; 			//거래처명

    @Column(nullable = false)
    private String taxInvoiceMail; 			//세금계산서 메일

    @Column(nullable = false)
    private String businessLicenseNumber; 	//사업자번호
    
    @Column(nullable = false)
    private String accountAddress; 			//거래처주소

    @Column(nullable = false)
    private String specialNote; 			//특이사항

    @Column(nullable = false)
    private String accountManager; 			//거래처 담당자
    
    @Column(nullable = true)
    private String establishedYear; 		//설립연도

    @ManyToOne
    @JoinColumn(name = "emplyCode")		//직원테이블 관계 설정
    private Employee employee;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;	//등록일
    
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt; //수정일
    
    @ManyToOne
    @JoinColumn(name = "productCode")
    private Product product;


    public Account(
			String customerRepresentative
			, String accountNumber
			, String accountName
			, String taxInvoiceMail
			, String businessLicenseNumber
			, String accountAddress
			, String specialNote
			, String accountManager
			, String establishedYear
			, Employee employee
			, Product product
	) {
        this.customerRepresentative = customerRepresentative;
        this.accountNumber = accountNumber;
        this.accountName = accountName;
        this.taxInvoiceMail = taxInvoiceMail;
        this.businessLicenseNumber = businessLicenseNumber;
        this.accountAddress = accountAddress;
        this.specialNote = specialNote;
        this.accountManager = accountManager;
        this.establishedYear = establishedYear;
        this.employee = employee;
        this.product = product;
    }

    public static Account of(
		final String customerRepresentative
		, final String accountNumber
		, final String accountName
		, final String taxInvoiceMail
		, final String businessLicenseNumber
		, final String accountAddress
		, final String specialNote
		, final String accountManager
		, final String establishedYear
		, final Employee employee
		, final Product product
	) {
        return new Account(
        		customerRepresentative
        		, accountNumber
        		, accountName
        		, taxInvoiceMail
        		, businessLicenseNumber
        		, accountAddress
        		, specialNote
        		, accountManager
        		, establishedYear
        		, employee
        		, product
        	);
    }
    
    /* 거래처 수정 */
    public void update(
		String customerRepresentative
		, String accountNumber
		, String accountName
		, String taxInvoiceMail
		, String businessLicenseNumber
		, String accountAddress
		, String specialNote
		, String accountManager
		, String establishedYear
		, Product product
	) {
		this.customerRepresentative = customerRepresentative;
		this.accountNumber = accountNumber;
		this.accountName = accountName;
		this.taxInvoiceMail = taxInvoiceMail;
		this.businessLicenseNumber = businessLicenseNumber;
		this.accountAddress = accountAddress;
		this.specialNote = specialNote;
		this.accountManager = accountManager;
		this.establishedYear = establishedYear;
		this.product = product;
    }

}