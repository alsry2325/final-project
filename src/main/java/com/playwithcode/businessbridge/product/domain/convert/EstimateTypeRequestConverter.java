package com.playwithcode.businessbridge.product.domain.convert;

import com.playwithcode.businessbridge.product.domain.type.EstimateType;
import org.springframework.core.convert.converter.Converter;

import java.lang.annotation.Annotation;

public class EstimateTypeRequestConverter implements Converter<String, EstimateType> {


    @Override
    public EstimateType convert(String source) {
        try {
            return EstimateType.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}

