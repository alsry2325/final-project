package com.playwithcode.businessbridge.product.service;

import com.playwithcode.businessbridge.product.domain.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor//반드시 필요한 argument 생성으로 final이 붙은 애들을 전부 생성해줌. 필드 추가만 해도 어노테이션이 생성자를 생성해줌.
public class ProductService {//Repository에 있는 기능들을 불러올거임. 데이터를
    //의존성 주입
    private final ProductRepository productRepository;




}
