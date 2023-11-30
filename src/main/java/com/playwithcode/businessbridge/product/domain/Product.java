package com.playwithcode.businessbridge.product.domain;

import com.playwithcode.businessbridge.product.domain.type.ProductCategoryType;
import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.util.Date;

import static com.playwithcode.businessbridge.product.domain.type.ProductStateType.SALES;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_product")
@NoArgsConstructor(access = PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Product {

    @Id
    @GeneratedValue(strategy = IDENTITY)//auto-increment처리
    private Long productCode;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private String productStandard;

    @Column(nullable = false)
    private Long productCnt;

    @Column(nullable = false)
    private Long productPrice;

    @Column(nullable = false)
    private Long provideValue;

    @Column
    private Long taxCnt;

    @Enumerated(value = STRING)
    @Column(nullable = false)
    private ProductCategoryType productCategory;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date productRegDt;

    @LastModifiedDate
    @Column(nullable = false)
    private Date productModifDt;


    @Column(nullable = false)
    private String productNum;


    @Column(nullable = false)
    private String productNote;


    @Enumerated(value = STRING)
    @Column(nullable = false)
    private ProductStateType productState = SALES;


    public Product(String productName, String productStandard, Long productCnt, Long productPrice, Long provideValue, Long taxCnt, ProductCategoryType productCategory,String productNum, String productNote) {
        this.productCategory = productCategory;
        this.productName = productName;
        this.productStandard = productStandard;
        this.productCnt = productCnt;
        this.productPrice = productPrice;
        this.provideValue = provideValue;
        this.taxCnt = taxCnt;
        this.productCategory = productCategory;
        this.productNum = productNum;
        this.productNote = productNote;
    }


    public static Product of(

            final String productName, final Long productCnt, final String productStandard,
            final Long productPrice, final Long provideValue, final Long taxCnt, final ProductCategoryType productCategory
            ,final  String productNum,final String productNote
    ) {
        return new Product(


                productName,
                productStandard,
                productCnt,
                productPrice,
                provideValue,
                taxCnt,
                productCategory,
                productNum,
                productNote

        );

    }
}
