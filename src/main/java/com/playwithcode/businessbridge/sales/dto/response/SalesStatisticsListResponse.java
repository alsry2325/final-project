package com.playwithcode.businessbridge.sales.dto.response;

//월별 완결 순위 통계 응답값 정의, JPQL은 인터페이스로 응답값을 받을 수 있다.
public interface SalesStatisticsListResponse {

	long getSales_rank();						//순위
	long getCount();							//건수
	String getMon();							//기준월
	String getDepartment_name();			//부성명
    String getPosition_name();				//직급명
    String getEmply_name();					//직원명
}
