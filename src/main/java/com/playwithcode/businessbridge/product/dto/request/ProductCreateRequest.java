package com.playwithcode.businessbridge.product.dto.request;

import com.playwithcode.businessbridge.product.domain.type.ProductCategoryType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.math.BigInteger;

@RequiredArgsConstructor
@Getter
public class ProductCreateRequest {



    @NotBlank
    //상품명
    private final String productName;

    //수량
    private final Long productCnt;
    @NotBlank
    //규격
    private final String productStandard;

    //단가
    private final Long productPrice;

    //공급가액
    private  final Long provideValue;


    //세액
    private final Long taxCnt;




    //상품 카테고리
    private final ProductCategoryType productCategory;

    //상품번호
    private final String productNum;


    @NotBlank
    //비고
    private final String productNote;



}
