package com.playwithcode.businessbridge.product.dto.request;

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
    @NotBlank
    //수량
    private final BigInteger productCnt;
    @NotBlank
    //규격
    private final String productStandard;
    @NotBlank
    //단가
    private final BigInteger productPrice;
    @NotBlank
    //공급가액
    private  final BigInteger provideValue;

    @NotBlank
    //세액
    private final BigInteger taxCnt;
    @NotBlank
    //비고
    private final String productNote;


}
