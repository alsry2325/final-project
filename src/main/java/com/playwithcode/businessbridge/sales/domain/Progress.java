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
    private LocalDateTime latestDateConsultation;	//최근 상담일자

    @Column(nullable = false, updatable = false)
    private LocalDateTime nextDayConsultation;	//다음 상담일자

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime registrationDate;	//등록일
    
    @JsonIgnore
	@ManyToOne
	@JoinColumn(name="salesCode")
    private Sales sales;
    
    public Progress(
		Sales sales
		, String status
		, String state
		, String specialNote
		, LocalDateTime latestDateConsultation
		, LocalDateTime nextDayConsultation
	) {
        this.sales = sales;
    	this.status = status;
        this.state = state;
        this.specialNote = specialNote;
        this.latestDateConsultation = latestDateConsultation;
        this.nextDayConsultation = nextDayConsultation;
    }

    public static Progress of(
		final Sales sales
		, final String status
		, final String state
		, final String specialNote
		, final LocalDateTime latestDateConsultation
		, final LocalDateTime nextDayConsultation
	) {
    	return new Progress(sales, status, state, specialNote, latestDateConsultation, nextDayConsultation);
    }

}