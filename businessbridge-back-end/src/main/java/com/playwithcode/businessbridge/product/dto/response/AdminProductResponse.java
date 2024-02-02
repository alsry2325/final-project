package com.playwithcode.businessbridge.product.dto.response;

import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.type.ProductCategoryType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class AdminProductResponse {


    private final Long productCode;

    private final ProductCategoryType productCategory;

    private final String productName;


    private final String productStandard;


    private final Long productCnt;


    private final Long productPrice;


    private final  Long provideValue;


    private final Long taxCnt;

    private final String productNote;

    public static AdminProductResponse from(final Product product) {
        return new AdminProductResponse(
                product.getProductCode(),
                product.getProductCategory(),
                product.getProductName(),
                product.getProductStandard(),
                product.getProductCnt(),
                product.getProductPrice(),
                product.getProvideValue(),
                product.getTaxCnt(),
                product.getProductNote()

        );

    }

}
