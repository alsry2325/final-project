package com.playwithcode.businessbridge.sales.domain;

import com.playwithcode.businessbridge.member.domain.Employee;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED) //기본생성자
@Getter
@Table(name = "tbl_sales")
@EntityListeners(AuditingEntityListener.class)
public class Sales {

    @Id
    @GeneratedValue(strategy = IDENTITY) //MYSQL을 쓸 떄 PK하나씩 자동으로 생성
    private Long salesCode; //영업코드

    @Column(nullable = false)
    private String salesName; // 영업이름

    @ManyToOne
    @JoinColumn(name = "salesMember")
    private Employee employee; // 영업담당자

    @Column(nullable = false)
    private String accountName; // 거래처명

    @Column(nullable = false)
    private String salesWay; //영업형태

    @Column(nullable = false)
    private String salesType; //영업유형

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;    //등록일

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt; //수정일

}
