package com.playwithcode.businessbridge.sales.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

//월별 완결 순위 통계 응답값 정의
public interface SalesStatisticsListResponse {

	String getSales_rank();				//순위
	String getCount();					//건수
	String getMon();				//기준월
	String getSales_member();				//직원명
	String getDepartment_name();		//부성명
    String getPosition_name();			//직급명
    String getEmply_name();			//직원명
    
}
