package com.playwithcode.businessbridge.sales.domain.repository;
import com.playwithcode.businessbridge.sales.domain.Sales;
import com.playwithcode.businessbridge.sales.dto.response.SalesStatisticsListResponse;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface SalesRepository extends JpaRepository<Sales, Long>, JpaSpecificationExecutor<Sales> {
	
    /* 1. 영업 상세 조회 - salesCode로 영업 1개 조회 */
    Optional<Sales> findBySalesCode(Long salesCode);

    /* 2. 월별 실적 순위 통계 목록 , JPQL 방식사용, 파라미터는 월*/
    @Query(value =
		"SELECT"+
		"	ts.sales_member"+
		"	, te.emply_name"+
		" 	, td.department_name"+
		" 	, tp.position_name"+			
    	"	, date_format(ts.modified_at, '%Y%m') AS mon"+
    	"	, COUNT(*) AS count"+
		"	, DENSE_RANK() OVER (PARTITION BY date_format(ts.modified_at, '%Y%m') ORDER BY COUNT(*) DESC) AS sales_rank"+
    	" FROM tbl_sales AS ts"+
    	" INNER JOIN tbl_employee AS te"+
    	" ON ts.sales_member = te.emply_code"+
    	" INNER JOIN tbl_department AS td"+
    	" ON te.department_code = td.department_code"+
    	" INNER JOIN tbl_position AS tp"+
    	" ON te.position_code = tp.position_code"+
        " WHERE ts.sales_status = '완결'"+
    	" AND date_format(ts.modified_at, '%Y%m') = :schMonth"+
    	" GROUP BY mon, ts.sales_member"
    	, nativeQuery = true
	)
    List<SalesStatisticsListResponse> salesStatisticsfindByMonthWithJPQL(@Param("schMonth") String schMonth);

    /* 2. 월별 실적 순위 통계 목록 , JPQL 방식사용 파라미터 없이 전체 조회*/
    @Query(value =
		"SELECT"+
		"	ts.sales_member"+
		"	, te.emply_name"+
		" 	, td.department_name"+
		" 	, tp.position_name"+			
    	"	, date_format(ts.modified_at, '%Y%m') AS mon"+
    	"	, COUNT(*) AS count"+
    	"	, DENSE_RANK() OVER (PARTITION BY date_format(ts.modified_at, '%Y%m') ORDER BY COUNT(*) DESC) AS sales_rank"+
    	" FROM tbl_sales AS ts"+
    	" INNER JOIN tbl_employee AS te"+
    	" ON ts.sales_member = te.emply_code"+
    	" INNER JOIN tbl_department AS td"+
    	" ON te.department_code = td.department_code"+
    	" INNER JOIN tbl_position AS tp"+
    	" ON te.position_code = tp.position_code"+
        " WHERE ts.sales_status = '완결'"+
    	" GROUP by mon, ts.sales_member"
    	, nativeQuery = true
	)
    List<SalesStatisticsListResponse> salesStatisticsWithJPQL();
}


/*

tbl_department
departmentCode 부서코드
departmentName 부서명

tbl_position
positionCode 직급
positionName 직급명

mysql이고 테이블 `tbl_sales`
[sales_name]	[status]	[date]
'홍길동'		'진행'	'2023-12-04'
'이순신'		'완료'	'2023-10-04'
'홍길동'		'완료'	'2023-10-04'
'임꺽정'		'완료'	'2023-11-04'
'임꺽정'		'완료'	'2023-11-17'
'나동찬'		'완료'	'2023-11-15'
'나성범'		'완료'	'2023-10-11'
'나성범'		'진행'	'2023-11-20'

SELECT
  sales_name,
  date_format(date, '%Y%m') AS month,
  COUNT(*) AS count,
  DENSE_RANK() OVER (PARTITION BY month ORDER BY count DESC) AS rank
FROM
  tbl_sales
WHERE
  status = '완료'
GROUP BY
  month
  
-WHERE 절은 status가 완료인 행만 선택합니다.
-GROUP BY 절은 month 열로 그룹화합니다.
-COUNT(*) 함수는 각 그룹의 행 수를 계산합니다.
-ORDER BY 절은 count 열의 내림차순으로 정렬합니다.
  
*/