package com.playwithcode.businessbridge.sales.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import com.playwithcode.businessbridge.sales.domain.Progress;
import com.playwithcode.businessbridge.sales.domain.SalesItem;

@RequiredArgsConstructor
@Getter
public class SalesUpdateRequest {

    @Min(value = 1)
    private Long SalesCode;		//영업코드
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
    private String salesStatus; //영업상태     
    
    private List<SalesItem> salesItemList;	//상품목록
    
    private List<Progress> progressList;	//진행내역목록
    
    
    
}
