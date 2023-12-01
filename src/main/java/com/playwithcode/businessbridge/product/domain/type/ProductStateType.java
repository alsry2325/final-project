package com.playwithcode.businessbridge.product.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ProductStateType {

    SALES("sales"),
    DISCONTINUED("discontinued"),
    DELETED("deleted");

    private final String value;

    ProductStateType(String value) {this.value = value; }

    @JsonCreator
    public static ProductStateType from(String value){
        for(ProductStateType productState : ProductStateType.values()) {
            if(productState.getValue().equals(value)){
                return productState;
            }
        }
        return null;
    }
    @JsonValue
    public String getValue(){ return  value;}
}
