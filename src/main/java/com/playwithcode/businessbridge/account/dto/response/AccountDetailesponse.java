package com.playwithcode.businessbridge.account.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.playwithcode.businessbridge.account.domain.Account;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class AccountDetailesponse {

    private final Long accountCode;
    private final String customerRepresentative;
    private final String accountNumber;
    private final String accountName;
    private final String taxInvoiceMail;
    private final String businessLicenseNumber;
    private final String accountAddress;
    private final String specialNote;
    private final String accountManager;
    private final String establishedYear;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime modifiedAt;
    private final String positionName;		//직급명
    private final String departmentName;	//부서명
    private final String productName;
    private final Long productCode;
    
    public static AccountDetailesponse from(Account account) {
        return new AccountDetailesponse(
    		account.getAccountCode()
    		, account.getCustomerRepresentative()
    		, account.getAccountNumber()
    		, account.getAccountName()
    		, account.getTaxInvoiceMail()
    		, account.getBusinessLicenseNumber()
    		, account.getAccountAddress()
    		, account.getSpecialNote()
    		, account.getAccountManager()
    		, account.getEstablishedYear()
    		, account.getCreatedAt()
    		, account.getModifiedAt()
    		, account.getEmployee().getPosition().getPositionName()
    		, account.getEmployee().getDepartment().getDepartmentName()	
    		, account.getProduct().getProductName()
    		, account.getProduct().getProductCode()
		);
    }
}
