package com.playwithcode.businessbridge.product.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.lang.reflect.Array;
import java.util.Arrays;



public enum ProductCategoryType {

    PRINTER("printer"),
    MEMORYCARD("memorycard");

    private final String value;

   ProductCategoryType(String value) {this.value = value; }

    @JsonCreator
    public static ProductCategoryType from(String value){
        for(ProductCategoryType productCategory : ProductCategoryType.values()) {
            if(productCategory.getValue().equals(value)){
                return productCategory;
            }
        }
        return null;
    }
    @JsonCreator
    public String getValue(){ return  value;}




}
