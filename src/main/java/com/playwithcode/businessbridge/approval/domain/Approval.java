package com.playwithcode.businessbridge.approval.domain;

import com.playwithcode.businessbridge.approval.domain.type.DocFormType;
import com.playwithcode.businessbridge.approval.domain.type.DocStatusType;
import com.playwithcode.businessbridge.member.domain.Employee;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.naming.AuthenticationException;
import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "tbl_approval")
@Getter
@NoArgsConstructor(access = PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Approval {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long approvalCode;                                  // 전자결재코드

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "approvalCode")
    private List<Approver> approverMember;                      // 결재자

    private LocalDateTime draftDateTime;                        // 기안일시

    private Long docNo;                                         // 문서 번호(문서 상태 승인 시 생성)

    @ManyToOne
    @JoinColumn(name = "draftMember")
    private Employee draftMember;                               // 기안자

    @Column(nullable = false)
    @Enumerated(value = STRING)
    private DocStatusType docStatus = DocStatusType.WAITING;       // 문서 상태
    // 대기(WAITING), 회수(COLLECT), 진행중(PROCEEDING), 반려(RETURN), 승인(ADMISSION)

    private LocalDateTime compltDateTime;                       // 완료일시
    // 완료 일시는 필요 없을지도,,
    private LocalDateTime collectionDateTime;                   // 회수일시

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime registDateTime;                       // 등록일시

    @Column(nullable = false)
    @Enumerated(value = STRING)
    private DocFormType docForm;                                // 문서양식(지출결의서, 업무기안서)

    @Column(nullable = false)
    private String title;                                       // 제목

    @OneToMany(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "approvalCode")
    private List<File> file;                                    // 첨부파일


    public Approval(List<Approver> approverMember, Employee draftMember, String title, DocFormType docForm, List<File> file) {
        this.approverMember = approverMember;
        this.draftMember = draftMember;
        this.title = title;
        this.docForm = docForm;
        this.file = file;
    }



    public static Approval of(List<Approver> approverMember, Employee draftMember, String title, DocFormType docForm, List<File> file) {
        return new Approval(
                approverMember, draftMember, title, docForm, file
        );
    }
}
