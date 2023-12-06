package com.playwithcode.businessbridge.product.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.playwithcode.businessbridge.product.domain.Estimate;
import com.playwithcode.businessbridge.product.domain.File;
import com.playwithcode.businessbridge.product.domain.type.EstimateType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@RequiredArgsConstructor
public class EstimateListResponse {

    private final EstimateType estiState;//진행사항
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime estiCreateDt;//견적일자(생성일자)

    private final String accountName; //거래처명
    //거래처코드
    private final Long accountCode;
    //담당자
    private final String accountManager;
    //전화번호
    private final Long accountNumber;

    //발송 이메일
    private final String sendEmail;

    //첨부파일
    private final List<File> file;

    public static EstimateListResponse from(Estimate estimate) {

        return new EstimateListResponse(
                estimate.getEstiState(),
                estimate.getEstiCreateDt(),
                estimate.getAccount().getAccountName(),
                estimate.getAccount().getAccountCode(),
                estimate.getAccount().getAccountManager(),
                estimate.getAccount().getAccountNumber(),
                estimate.getSendEmail(),
                estimate.getFile()



        );




    }




}
