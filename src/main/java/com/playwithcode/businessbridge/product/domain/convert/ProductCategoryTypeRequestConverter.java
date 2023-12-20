package com.playwithcode.businessbridge.product.domain.convert;

import com.playwithcode.businessbridge.product.domain.type.ProductCategoryType;
import org.springframework.core.convert.converter.Converter;

public class ProductCategoryTypeRequestConverter implements Converter<String, ProductCategoryType> {

    @Override
    public ProductCategoryType convert(String source) {
        try {
            return ProductCategoryType.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }



}
