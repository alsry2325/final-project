package com.playwithcode.businessbridge.sales.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.playwithcode.businessbridge.sales.domain.Sales;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class SalesListResponse {

    private final Long salesCode;
    private final String salesName;
    private final String salesType;
    private final String salesWay;
    private final String accountName;
    private final String salesMember;
    private final String salesStatus;
    private final String customerRating;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private final LocalDateTime modifiedAt;
    private final String productName;
    
    public static SalesListResponse from(Sales sales) {
        return new SalesListResponse(
    		sales.getSalesCode(),
    		sales.getSalesName(),
    		sales.getSalesType(),
    		sales.getSalesWay(),
    		sales.getAccountName(),
    		sales.getEmployee().getEmplyName(),
    		sales.getSalesStatus(),
    		sales.getCustomerRating(),
    		sales.getCreatedAt(),
    		sales.getModifiedAt(),
    		sales.getProduct().getProductName()
        );
    }
}
