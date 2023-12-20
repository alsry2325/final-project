package com.playwithcode.businessbridge.account.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.playwithcode.businessbridge.account.domain.Account;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class AccountListResponse {

    private final Long accountCode;				//거래처 코드
    private final String accountName;			//거래처 명
    private final String customerRepresentative;	//거래처 대표자
    private final String accountNumber;				//거래처 번호
    private final String taxInvoiceMail;			//세금계산서 메일
    private final String businessLicenseNumber;		//사업자번호 
    private final String accountAddress;			//거래처 주소
    private final String specialNote;				//특이사항
    private final String accountManager;			//거래처 담당자
    private final String establishedYear;			//설립년도
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime createdAt;			//등록일
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime modifiedAt;			//수정일
    private final String positionName;		//직급명
    private final String departmentName;	//부서명
    
    public static AccountListResponse from(Account account) {
    	return new AccountListResponse(
    		account.getAccountCode()
            , account.getAccountName()
    		, account.getCustomerRepresentative()
    		, account.getAccountNumber()
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
		);
    }
}
