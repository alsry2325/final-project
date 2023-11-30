package com.playwithcode.businessbridge.sales.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum SalesStatus {

    전체(0),
    접수(1),
    진행(2),
    완결(3);

    private final int value;

    SalesStatus(int value) {
        this.value = value;
    }


    @JsonCreator
    public static SalesStatus from(int value) {
        for(SalesStatus status : SalesStatus.values()) {
            if(status.getValue() == value) {
                return status;
            }
        }
        return null;
    }

    //getName 에 @JsonValue 해당 멤버필드가 이름을 통해 직렬화 시킴
    @JsonValue
    public int getValue() {
        return value;
    }

}
