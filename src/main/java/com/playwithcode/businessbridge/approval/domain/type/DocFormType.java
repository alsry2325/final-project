package com.playwithcode.businessbridge.approval.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum DocFormType {

    BUSINESS_DRAFT("businessDraft"),
    EXPENSE_REPORT("expenseReport");

    private final String value;

    DocFormType(String value) {this.value = value;}

    @JsonCreator
    public static DocFormType from(String value){
        for(DocFormType status : DocFormType.values()){
            if(status.getValue().equals(value)){
                return status;
            }
        }
        return null;
    }

    @JsonValue
    public String getValue() { return value; }
}
