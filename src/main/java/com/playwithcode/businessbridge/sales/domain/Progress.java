package com.playwithcode.businessbridge.sales.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_progress")
@NoArgsConstructor(access = PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Progress {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long progressCode;		//진행도관리 코드

    @Column(nullable = false)
    private String status;		//영업상태
    
    @Column(nullable = false)
    private String state; 		// 진행내용

    @Column(nullable = false)
    private String specialNote;	 //특이사항

    @Column(nullable = false, updatable = false)
    private String latestDateConsultation;	//최근 상담일자

    @Column(nullable = false, updatable = false)
    private String nextDayConsultation;	//다음 상담일자

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime registrationDate;	//등록일
    
    //진행내역관리 테이블과 N:1 관계 설정
    @JsonIgnore
	@ManyToOne
	@JoinColumn(name="salesCode")
    private Sales sales;
    
    public Progress(
		Sales sales
		, String state
		, String latestDateConsultation
		, String nextDayConsultation
	) {
        this.sales = sales;
        this.state = state;
        this.latestDateConsultation = latestDateConsultation;
        this.nextDayConsultation = nextDayConsultation;
    }

    public static Progress of(
		final Sales sales
		, final String state
		, final String latestDateConsultation
		, final String nextDayConsultation
	) {
    	return new Progress(sales, state, latestDateConsultation, nextDayConsultation);
    }

}