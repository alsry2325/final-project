package com.playwithcode.businessbridge.product.presentation;

import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.product.domain.type.EstimateType;

import com.playwithcode.businessbridge.product.dto.request.EstimateCreateRequest;
import com.playwithcode.businessbridge.product.dto.request.ProductCreateRequest;
import com.playwithcode.businessbridge.product.dto.response.EstimateListResponse;
import com.playwithcode.businessbridge.product.service.EstimateService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/emp")
public class EstimateController {

    private final EstimateService estimateService;

    //견적서 목록조회(진행상태별)
    @GetMapping("/estimate/estiState/{estiState}")
    public ResponseEntity<PagingResponse> getEstimateList(@RequestParam(defaultValue = "1") final Integer page, @PathVariable final EstimateType estiState) {

        final Page<EstimateListResponse> estimateList = estimateService.getEstimateList(page, estiState);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(estimateList);
        final PagingResponse pagingResponse = PagingResponse.of(estimateList.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }




    //견적서 목록 조회 - 상품명 검색 기준, 페이징 주문 불가 상품 제외
    @GetMapping("/estimate/searchName")
    public ResponseEntity<PagingResponse> getEstimateAccountName(
            @RequestParam(defaultValue = "1") final Integer page, @RequestParam final String accountName){

        final Page<EstimateListResponse> estimateList = estimateService.getEstimateAccountName(page, accountName);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(estimateList);
        final PagingResponse pagingResponse = PagingResponse.of(estimateList.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    //견적서 목록 조회 - 거레처명 검색 기준, 페이징 주문 불가 상품 제외
    @GetMapping("/estimate/search")
    public ResponseEntity<PagingResponse> getEstimateAccountManager(
            @RequestParam(defaultValue = "1") final Integer page, @RequestParam final String accountManager){

        final Page<EstimateListResponse> estimateList = estimateService.getEstimateAccountManager(page, accountManager);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(estimateList);
        final PagingResponse pagingResponse = PagingResponse.of(estimateList.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    //견적서 등록
    @PostMapping("/estimates/")
    public ResponseEntity<Void>save(@RequestPart @Valid final EstimateCreateRequest estimateRequest,
                                    @RequestPart final List<MultipartFile> attachments) {

        final Long estimateCode = estimateService.save(attachments,estimateRequest);



        return ResponseEntity.created(URI.create("estimate/regist/" + estimateCode)).build();
    }


    //견적서 수정



}
