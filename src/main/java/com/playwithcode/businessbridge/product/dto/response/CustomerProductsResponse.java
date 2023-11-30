package com.playwithcode.businessbridge.product.dto.response;

import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.type.ProductCategoryType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.math.BigInteger;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class CustomerProductsResponse {

    private final BigInteger productCode;

    private final ProductCategoryType productCategory;

    private final String productName;


    private final String productStandard;


    private final BigInteger productCnt;


    private final BigInteger productPrice;


    private final  BigInteger provideValue;


    private final BigInteger taxCnt;






    public static CustomerProductsResponse from(final Product product) {
        return  new CustomerProductsResponse(
                product.getProductCode(),
                product.getProductCategory(),
                product.getProductName(),
                product.getProductStandard(),
                product.getProductCnt(),
                product.getProductPrice(),
                product.getProvideValue(),
                product.getTaxCnt()

        );

    }
}
