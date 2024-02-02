package com.playwithcode.businessbridge.product.dto.request;

import com.playwithcode.businessbridge.product.domain.type.ProductCategoryType;
import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
@RequiredArgsConstructor
@Getter
@ToString
public class ProductUpdateRequest {


    //상품 카테고리
    private final ProductCategoryType productCategory;

   // @NotBlank
    //상품명
    private final String productName;

    //수량
    private final Long productCnt;
  //  @NotBlank
    //규격
    private final String productStandard;

    //단가
    private final Long productPrice;

    //공급가액
    private  final Long provideValue;


    //세액
    private final Long taxCnt;


  //  @NotBlank
    //비고
    private final String productNote;

 //   @NotNull
    private final ProductStateType productState;



}
