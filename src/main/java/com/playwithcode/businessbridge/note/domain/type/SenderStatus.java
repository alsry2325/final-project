package com.playwithcode.businessbridge.note.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum SenderStatus {

    /* 일반, 휴지통, 삭제 */

    SNDR_NORMAL("sndr_normal"),
    SNDR_TRASH("sndr_trash"),
    SNDR_DELETE("sndr_delete");

    private final String value;

    SenderStatus(String value) {
        this.value = value;
    }

    @JsonCreator
    public static SenderStatus from(String value) {
        for(SenderStatus senderStatusType : SenderStatus.values()) {
            if (senderStatusType.getValue().equals(value)) {
                return senderStatusType;
            }
        }
        return null;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
