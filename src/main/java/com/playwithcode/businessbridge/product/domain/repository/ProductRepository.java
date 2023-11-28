package com.playwithcode.businessbridge.product.domain.repository;

import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface ProductRepository extends JpaRepository<Product,BigInteger> {

    /*1. 상품 목록 조회 : 페이징, 주문 불가 상품 제외(고객)*/

    Page<Product>findByProductState(Pageable pageable, ProductStateType productStateType);//Pageable이라는 객체를 전달해서 페이징처리해줌-페이징처리 된 상태로 들어온다.

//    //2. 상품목록조회 : 페이징, 주문 불가 상품포함 //삭제되지 않은 애들만 조회 쿼리메소드 작성
//    Page<Product>findByStatusNot(Pageable pageable, ProductStateType productStateType);


    //상품목록조회 - 카테고리 기준, 페이징, 주문불가 상품 제외
    Page<Product> findByProductCategoryAndProductState(Pageable pageable, BigInteger categoryCode, ProductStateType productStateType);

    //-상품 목록 조회 - 상품명 검색 기준, 페이징 주문 불가 상품 제외
    Page<Product> findByProductNameContainsAndProductState(Pageable pageable, String productName, ProductStateType productStateType);

}
