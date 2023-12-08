package com.playwithcode.businessbridge.product.domain.convert;


import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import org.springframework.core.convert.converter.Converter;

public class ProductStateTypeRequestConverter  implements Converter<String, ProductStateType> {


    @Override
    public ProductStateType convert(String source) {
        try {
            return ProductStateType.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}