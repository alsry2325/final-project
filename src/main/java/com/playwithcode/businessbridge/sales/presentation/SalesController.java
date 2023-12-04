package com.playwithcode.businessbridge.sales.presentation;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.sales.domain.type.SalesStatus;
import com.playwithcode.businessbridge.sales.dto.request.SalesCreateRequest;
import com.playwithcode.businessbridge.sales.dto.request.SalesUpdateRequest;
import com.playwithcode.businessbridge.sales.dto.response.SalesDetailesponse;
import com.playwithcode.businessbridge.sales.dto.response.SalesListResponse;
import com.playwithcode.businessbridge.sales.service.SalesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SalesController {

    private final SalesService salesService;

    /* 3. 영업 목록 조회 - 검색조건, 페이징 */
    @GetMapping("/sales/salesList/{salesStatus}")
    public ResponseEntity<PagingResponse> getFindAll(
            @RequestParam(defaultValue = "1") final Integer page, @PathVariable final Integer salesStatus
            , @RequestParam(required = false) String schType
            , @RequestParam(required = false) String schText
    ) {

        log.info("METHOD GET /api/v1/salesList/{}",salesStatus);
        log.info("진행도 검색 타입 : {}", SalesStatus.from(salesStatus).name());

        final Page<SalesListResponse> salesList = salesService.getFindAll(page, SalesStatus.from(salesStatus).name(), schType, schText);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(salesList);
        final PagingResponse pagingResponse = PagingResponse.of(salesList.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 3. 영업 상세 조회 - salesCode로 영업 1개 조회*/
    @GetMapping("/sales/{salesCode}")
    public ResponseEntity<SalesDetailesponse> getSalesDetail(@PathVariable final Long salesCode) {
    	log.info("METHOD GET /api/v1/sales/{}",salesCode);
    	final SalesDetailesponse salesDetailesponse = salesService.getSalesDetail(salesCode);

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
    	//return ResponseEntity.created(URI.create("/sales-management/" + salesCode)).build();	//추후 주석해제
    	Map<String, Object> body = new HashMap<String, Object>();
    	body.put("message", "등록하였습니다.");
    	body.put("saelsCode", salesCode);
    	return ResponseEntity.ok(body);
    }

    /* 5. 영업수정 */
    @PutMapping("/sales/{salesCode}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable final Long salesCode, @RequestBody @Valid final SalesUpdateRequest salesUpdateRequest) {
    	log.info("METHOD PUT /api/v1/sales/{}",salesCode);
    	log.info("salesUpdateRequest >>>>>>>>>>>>>>>>>>>>>> {}",salesUpdateRequest.toString());
    	salesService.update(salesCode, salesUpdateRequest);

    	//return ResponseEntity.created(URI.create("/sales-management/" + salesCode)).build(); //추후 주석해제
    	Map<String, Object> body = new HashMap<String, Object>();
    	body.put("message", "수정하였습니다.");
    	body.put("saelsCode", salesCode);
    	return ResponseEntity.ok(body);
    }
    
    /* 6. 영업삭제) */
    @DeleteMapping("/sales/{salesCode}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable final Long salesCode) {
    	log.info("METHOD DELETE /api/v1/sales/{}",salesCode);
    	salesService.delete(salesCode);
    	//return ResponseEntity.noContent().build();
    	Map<String, Object> body = new HashMap<String, Object>();
    	body.put("message", "삭제하였습니다..");
    	return ResponseEntity.ok(body);
    }
    
}