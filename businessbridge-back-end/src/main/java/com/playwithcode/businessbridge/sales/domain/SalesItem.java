package com.playwithcode.businessbridge.sales.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.playwithcode.businessbridge.product.domain.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_salesitem")
@NoArgsConstructor(access = PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class SalesItem {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long salesItemCode;		//영업관리품목코드

    @JsonIgnore
    @ManyToOne
	@JoinColumn(name = "salesCode")
    private Sales sales;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "productCode")
    private Product product;
    
    @Column(nullable = false)
    private String productNote; 	//비고
    
    public SalesItem(Sales sales, Product product, String productNote) {
        this.sales = sales;
        this.product = product;
        this.productNote = productNote;
    }

    public static SalesItem of(final Sales sales, final Product product, final String productNote) {
        return new SalesItem(sales, product, productNote);
    }

}