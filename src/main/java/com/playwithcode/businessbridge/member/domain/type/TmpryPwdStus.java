package com.playwithcode.businessbridge.member.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TmpryPwdStus {

    REGULAR("regular"),        // 일반 비밀번호
    TEMPORARY("temporary") ;      // 임시 비밀번호

    private final String value;

    TmpryPwdStus(String value) {
        this.value = value;
    }

    @JsonCreator
    public static TmpryPwdStus from(String value) {
        for(TmpryPwdStus status : TmpryPwdStus.values()) {
            if(status.getValue().equals(value)) {
                return status;
            }
        }
        return null;
    }


    @JsonValue
    public String getValue() { return value; }

}
