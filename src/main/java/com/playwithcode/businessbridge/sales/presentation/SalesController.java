package com.playwithcode.businessbridge.sales.presentation;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.sales.domain.type.SalesStatus;
import com.playwithcode.businessbridge.sales.dto.request.ProgressCreateRequest;
import com.playwithcode.businessbridge.sales.dto.request.SalesCreateRequest;
import com.playwithcode.businessbridge.sales.dto.request.SalesUpdateRequest;
import com.playwithcode.businessbridge.sales.dto.response.SalesDetailResponse;
import com.playwithcode.businessbridge.sales.dto.response.SalesListResponse;
import com.playwithcode.businessbridge.sales.dto.response.SalesProductListResponse;
import com.playwithcode.businessbridge.sales.dto.response.SalesStatisticsListResponse;
import com.playwithcode.businessbridge.sales.service.SalesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.net.URI;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SalesController {

    private final SalesService salesService;

    /* 2. 영업 목록 조회 - 검색조건, 페이징 */
    @GetMapping("/sales/salesList/{salesStatus}")
    public ResponseEntity<PagingResponse> getSalesList(
            @RequestParam(defaultValue = "1") final Integer page, @PathVariable final Integer salesStatus
            , @RequestParam(required = false) String schType
            , @RequestParam(required = false) String schText
		) {
        
    	log.info("METHOD GET /api/v1/salesList/{}",salesStatus);
        log.info("진행도 검색 타입 : {}",SalesStatus.from(salesStatus).name());
        
        final Page<SalesListResponse> salesList = salesService.getSalesList(page, SalesStatus.from(salesStatus).name(), schType, schText);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(salesList);
        final PagingResponse pagingResponse = PagingResponse.of(salesList.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 3. 영업 상세 조회 - salesCode로 영업 1개 조회*/
    @GetMapping("/sales/{salesCode}")
    public ResponseEntity<SalesDetailResponse> getSalesDetail(@PathVariable final Long salesCode) {
    	log.info("METHOD GET /api/v1/sales/{}",salesCode);
    	final SalesDetailResponse salesDetailesponse = salesService.getSalesDetail(salesCode);

    	return ResponseEntity.ok(salesDetailesponse);
    }

  	/* 4. 영업등록 */
    @PostMapping("/sales")
    public ResponseEntity<Map<String, Object>> save(
    		@RequestBody @Valid final SalesCreateRequest salesCreateRequest
    		, @AuthenticationPrincipal final CustomUser customUser
    	) {
    	log.info("METHOD POST /api/v1/products");
    	log.info("salesCreateRequest >>>>>>>>>>>>>>>>>>>>>> {}",salesCreateRequest.toString());
    	final Long salesCode = salesService.save(salesCreateRequest, customUser);
    	return ResponseEntity.created(URI.create("/sales/" + salesCode)).build();
    }

    /* 5. 영업수정 */
    @PutMapping("/sales/{salesCode}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable final Long salesCode, @RequestBody @Valid final SalesUpdateRequest salesUpdateRequest) {
    	log.info("METHOD PUT /api/v1/sales/{}",salesCode);
    	log.info("salesUpdateRequest >>>>>>>>>>>>>>>>>>>>>> {}",salesUpdateRequest.toString());
    	salesService.update(salesCode, salesUpdateRequest);
    	return ResponseEntity.created(URI.create("/sales/" + salesCode)).build();
    }
    
    /* 6. 영업삭제) */
    @DeleteMapping("/sales/{salesCode}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable final Long salesCode) {
    	log.info("METHOD DELETE /api/v1/sales/{}",salesCode);
    	salesService.delete(salesCode);
    	return ResponseEntity.status(HttpStatus.CREATED).build();
    }

  	/* 7. 진행내역 등록 */
    @PostMapping("/progress")
    public ResponseEntity<Map<String, Object>> progressSave(
    		@RequestBody @Valid final ProgressCreateRequest progressCreateRequest
    		, @AuthenticationPrincipal final CustomUser customUser
    	) {
    	log.info("METHOD POST /api/v1/progress");
    	log.info("progressCreateRequest >>>>>>>>>>>>>>>>>>>>>> {}",progressCreateRequest.toString());
    	salesService.progressSave(progressCreateRequest, customUser);
    	/*
    		created() 메소드는 반환 객체에 대한 response 타입을 결정하는데, 
    		created로 할 경우 201 코드를 반환해 준다. 
    		201 코드는 POST 요청과 같이 서버의 리소스를 추가했을 때에 대한 응답 코드이며, 
    		201 응답 코드를 클라이언트 단에서 받게 되면, 정상 처리 되었다는 것을 알수 있게 된다.
        */
    	//return ResponseEntity.created(URI.create("/sales/" + progressCreateRequest.getSalesCode())).build();
    	//위아 애라랑 결과는 같음.
    	return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    
  	/* 8. 영업등록시 필요한 상품목록 */
    @GetMapping("/sales/productList")
    public ResponseEntity<List<SalesProductListResponse>> getProductList(
		) {
    	log.info("METHOD GET /api/v1/sales/productList");
        return ResponseEntity.ok(salesService.getProductList());
    }
    	
  	/* 8. 영업 통계 목록 */
    @GetMapping("/sales/salesStatistics/{schMonth}")
    public ResponseEntity<List<SalesStatisticsListResponse>> getSalesStatistics(
    		@PathVariable final String schMonth
		) {
    	log.info("METHOD GET /api/v1/sales/salesStatistics/{}",schMonth);
        return ResponseEntity.ok(salesService.getSalesStatistics(schMonth));
    }
    
}