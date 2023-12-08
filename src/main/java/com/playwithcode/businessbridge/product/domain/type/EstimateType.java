package com.playwithcode.businessbridge.product.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EstimateType {

    //진행
    PROGRESS("progress"),

    //보류
    DEFER("defer"),

    //계약
    CONTRACT("contract");

    private final String value;

    EstimateType(String value) {this.value = value;}

    @JsonCreator
    public static EstimateType from(String value){
        for(EstimateType estimate : EstimateType.values()) {
            if(estimate.getValue().equals(value)){
                return estimate;
            }
        }
        return null;
    }
    @JsonValue
    public String getValue(){ return  value;}

}
