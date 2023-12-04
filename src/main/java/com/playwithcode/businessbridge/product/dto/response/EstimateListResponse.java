package com.playwithcode.businessbridge.product.dto.response;

import com.playwithcode.businessbridge.product.domain.Estimate;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Getter
@RequiredArgsConstructor
public class EstimateListResponse {

    private String estiState;//진행사항

    private Date CreateDt;//견적일자(생성일자)

    private String accountName; //거래처
    //거래처코드
    private Long accountCode;
    //담당자
    private String accountManager;
    //전화번호
    private Long accountNumber;

    //발송 이메일
    private String sendEmail;
    //첨부파일




}
