package com.playwithcode.businessbridge.approval.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ApprovalStatusType {
    // 결재자의 결재 상태 타입

    WAITING("대기"),
    ACTIVATE("활성화"),
    PENDING("보류"),
    CONFIRM("승인"),
    RETURN("반려");

    private final String value;

    ApprovalStatusType(String value) {this.value = value;}

    @JsonCreator
    public static ApprovalStatusType from(String value){
        for(ApprovalStatusType status : ApprovalStatusType.values()){
            if(status.getValue().equals(value)){
                return status;
            }
        }
        return null;
    }

    @JsonValue
    public String getValue() { return value; }
}
