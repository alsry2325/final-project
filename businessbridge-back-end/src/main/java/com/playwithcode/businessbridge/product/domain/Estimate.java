package com.playwithcode.businessbridge.product.domain;

import com.playwithcode.businessbridge.product.domain.type.EstimateType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

import static com.playwithcode.businessbridge.product.domain.type.EstimateType.PROGRESS;
import static javax.persistence.EnumType.STRING;
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
    private LocalDateTime estiCreateDt;//생성일자

    private String estiMessage;//전달사항

    @Enumerated(value = STRING)
    private EstimateType estiState = PROGRESS;//상태

    @ManyToOne
    @JoinColumn(name ="emplyCode")
    private Employee employee;//사원코드
    @ManyToOne
    @JoinColumn(name ="accountCode" )
    private Account account;//거래처코드

    @LastModifiedDate
    private LocalDateTime estiModifyDt;//수정일자

    private LocalDateTime estiHoldDt;//보류일자

    @Column(nullable = false, updatable = false)
    private LocalDateTime estiContractDt; //계약일자

    private String estiNote;//비고

    private String sendEmail;//발송 이메일

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name ="attachfileCode")
    private List<File> files;//첨부파일






    public Estimate(String accountName, String accountManager, String sendEmail, String estimateNum, String accountAddress, String estiMessage, String productName, Long productCnt, Long productPrice, Long taxCnt, Long provideValue, String productNote) {
        this.estimateNum = estimateNum;
        this.estiCreateDt = estiCreateDt;
        this.estiMessage = estiMessage;
        this.estiState = estiState;
        this.employee = employee;
        this.account = account;
        this.estiModifyDt = estiModifyDt;
        this.estiHoldDt = estiHoldDt;
        this.estiContractDt = estiContractDt;
        this.estiMessage = estiMessage;
        this.sendEmail = sendEmail;
        this.files = files;

    }

    public static Estimate of(final String accountName, final String accountManager,
                              final String sendEmail, final String estimateNum, final String accountAddress, final String estiMessage,
                              final String productName, final Long productCnt, final Long productPrice, final Long taxCnt, final Long provideValue,
                              final String productNote
    ) {
        return new Estimate(
                accountName,
                accountManager,
                sendEmail,
                estimateNum,
                accountAddress,
                estiMessage,
                productName,
                productCnt,
                productPrice,
                taxCnt,
                provideValue,
                productNote
        );

    }


}
