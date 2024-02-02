package com.playwithcode.businessbridge.product.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.playwithcode.businessbridge.product.domain.File;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.cdi.Eager;
import org.springframework.format.annotation.DateTimeFormat;


import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@RequiredArgsConstructor
public class EstimateCreateRequest {

    @NotBlank
    //거래처
    private  final String accountName;
    @NotBlank
    //담당자
    private final String accountManager;

   //전화번호
    private final Long accountNumber;
    @NotBlank
    //발송이메일
    private final String sendEmail;
    @NotBlank
    //견적서번호
    private final String estimateNum;

    @NotBlank
    //거래처주소
    private final String accountAddress;

    //견적서 전달사항
    private final String estiMessage;

    @NotBlank
    //상품명
    private  final String productName;

    //수량
    private  final Long productCnt;

    //단가
    private  final Long productPrice;

    //부가세

    private final Long taxCnt;

    //공급가격

    private final Long provideValue;


    //상품비고
    private final String productNote;



}
