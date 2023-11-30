package com.playwithcode.businessbridge.product.domain;

import com.playwithcode.businessbridge.product.domain.type.ProductCategoryType;
import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.math.BigInteger;
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
    private BigInteger productCode;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private String productStandard;

    @Column(nullable = false)
    private BigInteger productCnt;

    @Column(nullable = false)
    private BigInteger productPrice;

    @Column(nullable = false)
    private BigInteger provideValue;

    @Column(nullable = false)
    private BigInteger taxCnt;

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
    private  String productNote;


    @Enumerated(value = STRING)
    @Column(nullable = false)
    private ProductStateType productState = SALES;


    public Product(String productName, String productStandard, BigInteger productCnt, BigInteger productPrice, BigInteger provideValue, BigInteger taxCnt, String productNote) {
        this.productName = productName;
        this.productStandard = productStandard;
        this.productCnt = productCnt;
        this.productPrice = productPrice;
        this.provideValue = provideValue;
        this.taxCnt = taxCnt;
        this.productNote = productNote;
    }

    public static Product of(
            final String productName, final BigInteger productCnt, final String productStandard,
            final BigInteger productPrice, final BigInteger provideValue, final BigInteger taxCnt, final String productNote
            ) {
        return new Product(
                productName,
                productStandard,
                productCnt,
                productPrice,
                provideValue,
                taxCnt,
                productNote

        );

    }
}
