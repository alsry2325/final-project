package com.playwithcode.businessbridge.sales.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.playwithcode.businessbridge.sales.domain.Sales;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class SalesDetailResponse {

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
    private final String positionName;		//직급명
    private final String departmentName;	//부서명
    private final List<ProgressResponse> progressList;
    private final String productName;
    private final Long productCode;
    
    public static SalesDetailResponse from(Sales sales) {
        return new SalesDetailResponse(
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
    		sales.getEmployee().getPosition().getPositionName(),
    		sales.getEmployee().getDepartment().getDepartmentName(),
    		sales.getProgressList().stream().map(ProgressResponse::from).collect(Collectors.toList()),
    		sales.getProduct().getProductName(),
    		sales.getProduct().getProductCode()
		);
    }
}