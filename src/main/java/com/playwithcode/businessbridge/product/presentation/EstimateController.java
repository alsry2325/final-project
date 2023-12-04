package com.playwithcode.businessbridge.product.presentation;

import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.product.dto.response.EstimateListResponse;
import com.playwithcode.businessbridge.product.service.EstimateService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/emp")
public class EstimateController {

    private final EstimateService estimateService;

    @GetMapping("/estimate/estState/{estistate}")

    public ResponseEntity<PagingResponse> getEstimateList(@RequestParam(defaultValue = "1") final Integer page, String estiState) {

        final Page<EstimateListResponse> estimateList = estimateService.getEstimateList(page);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(estimateList);
        final PagingResponse pagingResponse = PagingResponse.of(estimateList.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

}
