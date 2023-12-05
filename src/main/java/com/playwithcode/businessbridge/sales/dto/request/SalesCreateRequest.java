package com.playwithcode.businessbridge.sales.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.List;

import javax.validation.constraints.NotBlank;

import com.playwithcode.businessbridge.sales.domain.Progress;
import com.playwithcode.businessbridge.sales.domain.SalesItem;


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
    
    private List<SalesItem> salesItemList;	//상품목록

    private List<Progress> progressList;	//진행내역목록
    
}
