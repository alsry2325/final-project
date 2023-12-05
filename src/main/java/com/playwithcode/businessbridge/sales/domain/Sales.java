package com.playwithcode.businessbridge.sales.domain;

import com.playwithcode.businessbridge.member.domain.Employee;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_sales")
@NoArgsConstructor(access = PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Sales {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long salesCode;		//영업번호

    @Column(nullable = false)
    private String salesName;	//영업이름

    @Column(nullable = false)
    private String salesType;	//영업유형
    
    @Column(nullable = false)
    private String accountName; // 거래처명

    @Column(nullable = false)
    private String salesWay; //영업형태

    @Column(nullable = false)
    private String salesStatus; //진행도상태
    
    @Column(nullable = false)
    private String customerRating; //고객등급
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;	//등록일
    
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt; //수정일

    @ManyToOne
    @JoinColumn(name = "salesMember")
    private Employee employee;

    //영업품목관리 테이블과 1:N 관계 설정
	@OneToMany(mappedBy = "sales",fetch = FetchType.LAZY)
    private List<SalesItem> salesItemList;
	
    //진행내역관리 테이블과 1:N 관계 설정
	@OneToMany(mappedBy = "sales",fetch = FetchType.LAZY)
    private List<Progress> progressList;
    
    public Sales(String salesName, String salesType, String accountName, String salesWay, String salesStatus, String customerRating, Employee employee, List<SalesItem> salesItemList, List<Progress> progressList) {
        this.salesName = salesName;
        this.salesType = salesType;
        this.accountName = accountName;
        this.salesStatus = salesStatus;
        this.salesWay = salesWay;
        this.customerRating = customerRating;
        this.employee = employee;
        this.salesItemList = salesItemList;
        this.progressList = progressList;
    }

    //dto에서
    //of란? dto To Entity
    public static Sales of(
		final String salesName
		, final String salesType
		, final String accountName
		, final String salesWay
		, final String salesStatus
		, final String customerRating
		, final Employee employee
		, final List<SalesItem> salesItemList
		, final List<Progress> progressList
	) {
        return new Sales(salesName, salesType, accountName, salesWay, salesStatus, customerRating, employee, salesItemList, progressList);
    }
    
    /* 영업수정 */
    public void update(
		String salesName
		, String salesType
		, String salesWay
		, String accountName
		, String customerRating
		, String salesStatus
		, List<SalesItem> salesItemList
		, List<Progress> progressList
	) {
		this.salesName = salesName;
		this.salesType = salesType;
		this.salesWay = salesWay;
		this.accountName = accountName;
		this.customerRating = customerRating;
		this.salesStatus = salesStatus;
		this.salesItemList = salesItemList;
		this.progressList = progressList;
    }

}