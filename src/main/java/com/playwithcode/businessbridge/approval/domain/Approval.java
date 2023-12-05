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

    private LocalDateTime draftDateTime;                        // 기안일시(등록일시로 퉁쳐?)

    private int docNo;                                         // 문서 번호(문서 상태 완료 시 생성)

    @ManyToOne
    @JoinColumn(name = "draftMember")
    private Employee draftMember;                                // 기안자

    @Column(nullable = false)
    @Enumerated(value = STRING)
    private DocStatusType docStatus;                            // 문서 상태
    // ,WAITING(대기),PROCEEDING(진행중),RETURN(반려),COMPLETE(완료)
    // COLLECT(회수), TEMP_STORAGE(임시저장)

    private LocalDateTime compltDateTime;                       // 완료일시

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


    public Approval(List<Approver> approverMember,DocStatusType docStatus, Employee draftMember, String title, DocFormType docForm, List<File> file) {
        this.approverMember = approverMember;
        this.docStatus = docStatus;
        this.draftMember = draftMember;
        this.title = title;
        this.docForm = docForm;
        this.file = file;
    }

    public static Approval of(List<Approver> approverMember,DocStatusType docStatus, Employee draftMember, String title, DocFormType docForm, List<File> file) {
        return new Approval(
                approverMember, docStatus, draftMember, title, docForm, file
        );
    }

    public void update(List<Approver> approvers, String title, DocStatusType docStatus, List<File> files) {
        this.approverMember = approvers;
        this.title = title;
        this.docStatus = docStatus;
        this.file = files;
    }

    public void collect(DocStatusType docStatus, LocalDateTime collectionDateTime){
        this.docStatus = docStatus;
        this.collectionDateTime = collectionDateTime;
    }

    public void approve(DocStatusType docStatus){
        this.docStatus = docStatus;
    }

    public void done(DocStatusType docStatus, LocalDateTime compltDateTime, int docNo){
        this.docStatus = docStatus;
        this.compltDateTime = compltDateTime;
        this.docNo = docNo;
    }
}
