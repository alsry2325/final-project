package com.playwithcode.businessbridge.sales.dto.request;

import lombok.Data;

@Data
public class SalesSearchRequest {

    private final String salesName;		//영업이름
    private final String accountName; // 거래처명
    
}
