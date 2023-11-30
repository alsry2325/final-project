package com.playwithcode.businessbridge.approval.domain.type;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum DocStatusType {
    // 결재 문서 상태 타입

    COLLECT("회수"),
    TEMP_STORAGE("임시저장"),
    WAITING("대기"),
    PROCEEDING("진행중"),
    RETURN("반려"),
    ADMISSION("승인");

    private final String value;

    DocStatusType(String value) {this.value = value;}

    @JsonCreator
    public static DocStatusType from (String value){
        for(DocStatusType status : DocStatusType.values()){
            if(status.getValue().equals(value)){
                return status;
            }
        }
        return null;
    }

    @JsonValue
    public String getValue() { return  value; }
}
