package com.playwithcode.businessbridge.account.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RequiredArgsConstructor
@Getter
public class AccountUpdateRequest {

    @Min(value = 1)
    private Long accountCode;		//거래처코드
    @NotBlank
    private String accountName;					//거래처명
    @NotNull
    private Long productCode;		//상품코드
    @NotBlank
    private String businessLicenseNumber; 		//사업자번호
    @NotBlank
    private String accountManager;				//거래처담당자 
    @NotBlank
    private String accountNumber;				//거래처 연락처
    @NotBlank
    private String accountAddress;				//거래처주소 
    @NotBlank
    private String taxInvoiceMail; 				// 세금계산서 메일
    @NotBlank
    private String customerRepresentative;		//거래처 대표
    @NotBlank
    private String specialNote;					//특이사항  
    //@NotBlank
    private String establishedYear;				//설립년도     
    
}
