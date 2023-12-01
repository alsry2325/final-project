package com.playwithcode.businessbridge.product.service;

import com.playwithcode.businessbridge.common.exception.BadRequestException;
import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.repository.ProductRepository;
import com.playwithcode.businessbridge.product.domain.type.ProductCategoryType;
import com.playwithcode.businessbridge.product.dto.request.ProductCreateRequest;
import com.playwithcode.businessbridge.product.dto.request.ProductUpdateRequest;
import com.playwithcode.businessbridge.product.dto.response.AdminProductResponse;
import com.playwithcode.businessbridge.product.dto.response.CustomerProductResponse;
import com.playwithcode.businessbridge.product.dto.response.CustomerProductsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigInteger;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.NOT_FOUND_EMPLY_CODE;
import static com.playwithcode.businessbridge.product.domain.type.ProductStateType.DELETED;
import static com.playwithcode.businessbridge.product.domain.type.ProductStateType.SALES;

@Slf4j
@Service
@RequiredArgsConstructor//반드시 필요한 argument 생성으로 final이 붙은 애들을 전부 생성해줌. 필드 추가만 해도 어노테이션이 생성자를 생성해줌.
@Transactional
public class ProductService {//Repository에 있는 기능들을 불러올거임. 데이터를
    //의존성 주입
    private final ProductRepository productRepository;


    private Pageable getPageable(final Integer page) {

        return PageRequest.of(page - 1, 10, Sort.by("productCode").descending());
    }


    //1.상품 목록 조회 : 페이징, 주문 불가 상품 제외(고객)-조건이 있어서 쿼리메소드로 작성해주고 사용할수 있음.
    @Transactional(readOnly = true)
    public Page<CustomerProductsResponse> getProductList(final Integer page) {

        Page<Product> products = productRepository.findByProductState(getPageable(page), SALES);

        return products.map(product -> CustomerProductsResponse.from(product));


    }


//    //2.상품 목록 조회 : 페이징, 주문 불가 상품 포함 -관리자
//    @Transactional(readOnly = true )
//    public Page<AdminProductsResponse> getAdminProducts(final Integer page) {
//
//        Page<Product> products = productRepository.findByStatusNot(getPageable(page),DELETED);
//
//        return products.map(product -> CustomerProductsResponse.from(product));
//
//
//    }


    //상품목록조회 - 카테고리 기준, 페이징, 주문불가 상품 제외

    @Transactional(readOnly = true)
    public Page<CustomerProductsResponse> getProductsByCategory(final Integer page, final ProductCategoryType productCategory) {

        Page<Product> products = productRepository.findByProductCategoryAndProductState(getPageable(page), productCategory, SALES);

        return products.map(product -> CustomerProductsResponse.from(product));


    }


    //-상품 목록 조회 - 상품명 검색 기준, 페이징 주문 불가 상품 제외

    @Transactional(readOnly = true)
    public Page<CustomerProductsResponse> getProductsByProductName(Integer page, String productName) {


        Page<Product> products = productRepository.findByProductNameContainsAndProductState(getPageable(page), productName, SALES);

        return products.map(product -> CustomerProductsResponse.from(product));


    }

    //상품 상세 조회 - productCode로 상품 1개 조회, 주문 불가 상품 제외
    @Transactional(readOnly = true)
    public CustomerProductResponse getProductSales(final BigInteger productCode) {

        Product product = productRepository.findByProductCodeAndProductState(productCode, SALES)
                .orElseThrow(() -> new BadRequestException(NOT_FOUND_EMPLY_CODE));

        return CustomerProductResponse.from(product);
    }

    // 상품상세 조회 -productCode로 상품1개 조회, 주문불가 상품 포함
    @Transactional(readOnly = true)
    public AdminProductResponse getAllProductState(final Long productCode) {
        Product product = productRepository.findByProductCodeAndProductStateNot(productCode, DELETED)
                .orElseThrow(() -> new BadRequestException(NOT_FOUND_EMPLY_CODE));

        return AdminProductResponse.from(product);

    }

    //상픔 등록
    public Long save(final ProductCreateRequest productRequest) {

        log.info("productRequest.getProductCategory: {}", productRequest.getProductCategory());

        final Product newproduct = Product.of(
                productRequest.getProductName(),
                productRequest.getProductCnt(),
                productRequest.getProductStandard(),
                productRequest.getProductPrice(),
                productRequest.getProvideValue(),
                productRequest.getTaxCnt(),
                productRequest.getProductCategory(),
                productRequest.getProductNum(),
                productRequest.getProductNote()
        );


      final Product product = productRepository.save(newproduct);

      return product.getProductCode();



    }


    //상품 수정
    public void update(final Long productCode, final ProductUpdateRequest productRequest) {


        Product product = productRepository.findByProductCodeAndProductStateNot(productCode, DELETED)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_EMPLY_CODE));


        //entity정보변경

        product.update(
                productRequest.getProductCategory(),
                productRequest.getProductName(),
                productRequest.getProductCnt(),
                productRequest.getProductStandard(),
                productRequest.getProductPrice(),
                productRequest.getProvideValue(),
                productRequest.getTaxCnt(),
                productRequest.getProductNote(),
                productRequest.getProductState()

        );


    }
}

