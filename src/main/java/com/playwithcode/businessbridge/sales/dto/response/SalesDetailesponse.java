package com.playwithcode.businessbridge.sales.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.playwithcode.businessbridge.sales.domain.Progress;
import com.playwithcode.businessbridge.sales.domain.Sales;
import com.playwithcode.businessbridge.sales.domain.SalesItem;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class SalesDetailesponse {

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
    private final List<Progress> progressList;
    //private final List<SalesItem> salesItemList;
    private final String productName;
    
    public static SalesDetailesponse from(Sales sales) {
        return new SalesDetailesponse(
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
    		sales.getProgressList(),
    		//sales.getSalesItemList()
            sales.getProduct().getProductName()
		);
    }
}
