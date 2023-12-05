package com.playwithcode.businessbridge.note.domain.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum RecipientStatus {

    /* 일반, 보관, 휴지통, 삭제 */

    RCVR_NORMAL("rcvr_normal"),
    RCVR_STORAGE("rcvr_storage"),
    RCVR_TRASH("rcvr_trash"),
    RCVR_DELETE("rcvr_delete");

    private final String value;

    RecipientStatus(String value) {
        this.value = value;
    }

    @JsonCreator
    public static RecipientStatus from(String value) {
        for(RecipientStatus recipientStatus : RecipientStatus.values()) {
            if (recipientStatus.getValue().equals(value)) {
                return recipientStatus;
            }
        }
        return null;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

}
