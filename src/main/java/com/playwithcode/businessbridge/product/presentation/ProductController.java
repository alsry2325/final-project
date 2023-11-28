package com.playwithcode.businessbridge.product.presentation;

import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.product.dto.response.CustomerProductsResponse;
import com.playwithcode.businessbridge.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@RestController
@RequiredArgsConstructor
@RequestMapping("/emp")
public class ProductController {

    private final ProductService productService;

    //1.상품 목록 조회 - 페이징, 주문 불가 상품 제외(고객)

    @GetMapping("/products")
    public ResponseEntity<PagingResponse> getProductList(@RequestParam(defaultValue = "1") final Integer page){

        final Page<CustomerProductsResponse> products = productService.getProductList(page);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(products);
        final PagingResponse pagingResponse = PagingResponse.of(products.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    //상품목록조회 - 카테고리 기준, 페이징, 주문불가 상품 제외

    @GetMapping("/products/categories/{categoryCode}")
    public ResponseEntity<PagingResponse> getProductsByCategory(
            @RequestParam(defaultValue = "1") final Integer page, @PathVariable final BigInteger categoryCode){

        final Page<CustomerProductsResponse> products = productService.getProductsByCategory(page, categoryCode);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(products);
        final PagingResponse pagingResponse = PagingResponse.of(products.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }



    //-상품 목록 조회 - 상품명 검색 기준, 페이징 주문 불가 상품 제외
    @GetMapping("/products/search")
    public ResponseEntity<PagingResponse> getProductsByProductName(
            @RequestParam(defaultValue = "1") final Integer page, @RequestParam final String productName){

        final Page<CustomerProductsResponse> products = productService.getProductsByProductName(page, productName);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(products);
        final PagingResponse pagingResponse = PagingResponse.of(products.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }



}
