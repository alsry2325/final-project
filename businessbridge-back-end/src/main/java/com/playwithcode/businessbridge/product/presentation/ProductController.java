package com.playwithcode.businessbridge.product.presentation;

import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.type.EstimateType;
import com.playwithcode.businessbridge.product.domain.type.ProductCategoryType;
import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import com.playwithcode.businessbridge.product.dto.request.ProductCreateRequest;
import com.playwithcode.businessbridge.product.dto.request.ProductUpdateRequest;
import com.playwithcode.businessbridge.product.dto.response.AdminProductResponse;
import com.playwithcode.businessbridge.product.dto.response.CustomerProductResponse;
import com.playwithcode.businessbridge.product.dto.response.CustomerProductsResponse;
import com.playwithcode.businessbridge.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigInteger;
import java.net.URI;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ProductController {

    private final ProductService productService;

    //1.상품 목록 조회 - 페이징, 주문 불가 상품 제외(사원)

    @GetMapping("/products/employee")
    public ResponseEntity<PagingResponse> getProductList(@RequestParam(defaultValue = "1") final Integer page){



        final Page<CustomerProductsResponse> products = productService.getProductList(page);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(products);
        final PagingResponse pagingResponse = PagingResponse.of(products.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);

    }

    //
    //상품 목록 -관리자 주문 불가 상품 포함 전체 조회
    @GetMapping("/products/management/productState/{productState}")
    public ResponseEntity<PagingResponse> getAdminProducts(@RequestParam(defaultValue = "1") final Integer page, @PathVariable final ProductStateType productState) {

        log.info("productList productState {}", productState);
        final Page<AdminProductResponse> products = productService.getAdminProducts(page, productState);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(products);
        final PagingResponse pagingResponse = PagingResponse.of(products.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }


    //상품목록조회 - 카테고리 기준, 페이징, 주문불가 상품 제외(사원)

    @GetMapping("/products/categories/{productCategory}")
    public ResponseEntity<PagingResponse> getProductsByCategory(
            @RequestParam(defaultValue = "1") final Integer page, @PathVariable final ProductCategoryType productCategory){

        log.info("GET /api/v1/products/categories/{}",productCategory);

        final Page<CustomerProductsResponse> products = productService.getProductsByCategory(page, productCategory);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(products);
        final PagingResponse pagingResponse = PagingResponse.of(products.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }



    //-상품 목록 조회 - 상품명 검색 기준, 페이징 주문 불가 상품 제외(사원)
    @GetMapping("/products/search")
    public ResponseEntity<PagingResponse> getProductsByProductName(
            @RequestParam(defaultValue = "1") final Integer page, @RequestParam final String productName){

        final Page<CustomerProductsResponse> products = productService.getProductsByProductName(page, productName);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(products);
        final PagingResponse pagingResponse = PagingResponse.of(products.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }


    //상품 상세 조회 -productCode로 상품 1개 조회, 주문불가상품 제외
    @GetMapping("/products/{productCode}")
    public ResponseEntity<CustomerProductResponse> getProductSales(@PathVariable final Long productCode){

        final CustomerProductResponse customerProductResponse = productService.getProductSales(productCode);

        return ResponseEntity.ok(customerProductResponse);
    }



    //상품 상세 조회 -productCode로 상품 1개 조회, 주문 불가 상품 포함

    @GetMapping("/products-allstate/{productCode}")
    public ResponseEntity<AdminProductResponse> getAllProductState(@PathVariable final Long productCode){

        final AdminProductResponse adminProductResponse = productService.getAllProductState(productCode);

        return ResponseEntity.ok(adminProductResponse);
    }
    //상품 등록
    @PostMapping("/products/regist")
    public ResponseEntity<Void>save(@RequestBody @Valid final ProductCreateRequest productRequest){

        final Long productCode = productService.save(productRequest);

        log.info("productRequest : {} ",productRequest);

        return ResponseEntity.created(URI.create("products/regist/" + productCode)).build();
    }


    //상품수정
    @PutMapping("products/{productCode}")
    public ResponseEntity<Void> update(@PathVariable final  Long productCode,
                                       @RequestBody  @Valid final ProductUpdateRequest productRequest) {
        log.info("productRequest : {} ",productRequest);


        productService.update(productCode,productRequest);


        return ResponseEntity.created(URI.create("products/modify/"+ productCode)).build();

    }

}
