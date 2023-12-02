package com.playwithcode.businessbridge.sales.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.playwithcode.businessbridge.sales.domain.Sales;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class SalesResponse {

    private final Long salesCode;
    private final String salesName;
    private final String salesType;
    private final String salesWay;
    private final String accountName;
    private final String salesMember;
    private final String salesStatus;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime modifiedAt;

    public static SalesResponse from(Sales sales) {
        return new SalesResponse(
    		sales.getSalesCode(),
    		sales.getSalesName(),
    		sales.getSalesType(),
    		sales.getSalesWay(),
    		sales.getAccountName(),
    		sales.getSalesStatus(),
    		sales.getEmployee().getEmplyName(),
    		sales.getCreatedAt(),
    		sales.getModifiedAt()
        );
    }
}
