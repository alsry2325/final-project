package com.playwithcode.businessbridge.approval.domain;

import com.playwithcode.businessbridge.approval.domain.type.DocStatusType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.bytebuddy.asm.Advice;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_approval")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Approval {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long approvalCode;                                  // 전자결재코드

    private LocalDateTime draftDateTime;                        // 기안일시

    private Long docNo;                                         // 문서 번호(문서 상태 승인 시 생성)

    @ManyToOne
    @JoinColumn(name = "draftMember")
    private ApprovalMember draftMember;                         // 기안자

    @Column(nullable = false)
    @Enumerated(value = STRING)
    private DocStatusType status = DocStatusType.WAITING;       // 문서 상태
    // 대기(WAITING), 회수(COLLECT), 진행중(PROCEEDING), 반려(RETURN), 승인(ADMISSION)

    private LocalDateTime compltDateTime;                       // 완료일시

    private LocalDateTime collectionDateTime;                   // 회수일시

    @Column(nullable = false)
    private LocalDateTime registDateTime;                       // 등록일시

    @Column(nullable = false)
    private String docForm;                                     // 문서양식(지출결의서, 업무기안서)

    @Column(nullable = false)
    private String title;                                       // 제목

    // 첨부파일
}
