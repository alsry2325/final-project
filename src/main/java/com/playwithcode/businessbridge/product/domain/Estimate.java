package com.playwithcode.businessbridge.product.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_estimate")
@NoArgsConstructor(access = PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Estimate {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long estimateCode;//견적서코드

    private String estimateNum;//견적서 번호
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Date estiCreateDt;//생성일자

    private String estiMessage;//전달사항

    private String estiState;//상태
    @ManyToOne
    @JoinColumn(name ="emplyCode")
    private Employee employee;//사원코드
    @ManyToOne
    @JoinColumn(name ="accountCode" )
    private Account account;//거래처코드
    @LastModifiedDate
    private Date estiModifyDt;//수정일자

    private Date estiHoldDt;//보류일자

    @Column(nullable = false, updatable = false)
    private Date estiContractDt; //계약일자

    private String estiNote;//비고

    private String sendEmail;//발송 이메일

    @OneToMany
    @JoinColumn(name ="attachfileCode")
    private List<File> file;//첨부파일


}
