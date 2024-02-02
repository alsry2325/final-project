package com.playwithcode.businessbridge.sales.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@RequiredArgsConstructor
@Getter
@ToString
public class SalesCreateRequest {

    @NotBlank
    private String salesName;		//영업이름
    @NotBlank
    private String salesType;		//영업유형
    @NotBlank
    private String salesWay;		//영업형태
    @NotBlank
    private String accountName; // 거래처명
    @NotBlank
    private String customerRating; //고객등급
    @NotBlank
    private String salesStatus = "접수";     
    @NotNull
    private Long productCode;		//상품코드
    
}
