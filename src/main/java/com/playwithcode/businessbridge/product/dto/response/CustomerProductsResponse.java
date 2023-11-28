package com.playwithcode.businessbridge.product.dto.response;

import com.playwithcode.businessbridge.product.domain.Product;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.math.BigInteger;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class CustomerProductsResponse {

    private final BigInteger productCode;

    private final String productName;


    private final String productStandard;


    private final BigInteger productCnt;


    private final BigInteger productPrice;


    private final  BigInteger provideValue;


    private final BigInteger taxCnt;


    private final BigInteger productCategory;



    public static CustomerProductsResponse from(final Product product) {
        return  new CustomerProductsResponse(
                product.getProductCode(),
                product.getProductName(),
                product.getProductStandard(),
                product.getProductCnt(),
                product.getProductPrice(),
                product.getProvideValue(),
                product.getTaxCnt(),
                product.getProductCategory()
        );

    }
}
