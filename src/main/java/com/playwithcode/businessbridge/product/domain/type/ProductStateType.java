package com.playwithcode.businessbridge.product.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ProductStateType {

    SALES("sales"),
    SUSPENSION("suspension"),
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
    @JsonCreator
    public String getValue(){ return  value;}
}
