package com.playwithcode.businessbridge.sales.presentation;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.sales.domain.type.SalesStatus;
import com.playwithcode.businessbridge.sales.dto.response.SalesListResponse;
import com.playwithcode.businessbridge.sales.service.SalesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/sales")
@RequiredArgsConstructor
public class SalesController {

    private final SalesService salesService;

    /* 3. 영업 목록 조회 - 검색조건, 페이징 */
    @GetMapping("/salesList/{salesStatus}")
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

}