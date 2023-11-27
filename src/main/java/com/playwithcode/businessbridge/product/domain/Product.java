package com.playwithcode.businessbridge.product.domain;

import com.playwithcode.businessbridge.product.domain.type.ProductStateType;
import lombok.AccessLevel;
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
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_product")
@NoArgsConstructor(access = PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Product {

    @Id
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

    @Column(nullable = false)
    private BigInteger productCategory;

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



}
