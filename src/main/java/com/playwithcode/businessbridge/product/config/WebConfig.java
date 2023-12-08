package com.playwithcode.businessbridge.product.config;

import com.playwithcode.businessbridge.product.domain.convert.EstimateTypeRequestConverter;
import com.playwithcode.businessbridge.product.domain.convert.ProductStateTypeRequestConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements WebMvcConfigurer {
    private Object Priority;

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new EstimateTypeRequestConverter());
        registry.addConverter(new ProductStateTypeRequestConverter());

    }



    }

