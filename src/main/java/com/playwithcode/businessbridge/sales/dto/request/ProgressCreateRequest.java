package com.playwithcode.businessbridge.sales.dto.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;



@RequiredArgsConstructor
@Getter
@ToString
public class ProgressCreateRequest {
	
	@NotNull
	private Long salesCode;		//영업코드
    //@NotBlank
    //private String status;		//영업상태
    @NotBlank
    private String state;		//진행내용
    //@NotBlank
    //private String specialNote;		//특이사항
    @NotBlank
    private String latestDateConsultation; // 최근 상담일자
    @NotBlank
    private String nextDayConsultation; //다음 상담일자
    
}
