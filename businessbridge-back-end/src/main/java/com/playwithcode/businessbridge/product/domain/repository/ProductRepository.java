package com.playwithcode.businessbridge.product.domain.repository;

import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.type.ProductCategoryType;
import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {

    /* 1. 상품 상태에 따른 페이징 목록 조회 */
    @EntityGraph(attributePaths = {"productCategory"})
    Page<Product>findByProductState(Pageable pageable, ProductStateType productState);//Pageable이라는 객체를 전달해서 페이징처리해줌-페이징처리 된 상태로 들어온다.

    //상품목록조회 - 카테고리 기준, 페이징, 주문불가 상품 제외
    Page<Product> findByProductCategoryAndProductState(Pageable pageable, ProductCategoryType productCategory, ProductStateType productState);

    //-상품 목록 조회 - 상품명 검색 기준, 페이징 주문 불가 상품 제외
    Page<Product> findByProductNameContainsAndProductState(Pageable pageable, String productName, ProductStateType productState);

   // 상품 상세 조회 - productCode로 상품 1개 조회, 주문 불가 상품 제외
    Optional<Product> findByProductCodeAndProductState(Long productCode, ProductStateType productState);

  //  상품상세 조회 -productCode로 상품1개 조회, 주문불가 상품 포함
    Optional<Product> findByProductCodeAndProductStateNot(Long productCode, ProductStateType productState);


}
