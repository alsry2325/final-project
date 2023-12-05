package com.playwithcode.businessbridge.note.domain;

import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.note.domain.type.RecipientStatus;
import com.playwithcode.businessbridge.note.domain.type.SenderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.time.LocalDateTime;

import static com.playwithcode.businessbridge.note.domain.type.RecipientStatus.RCVR_NORMAL;
import static com.playwithcode.businessbridge.note.domain.type.SenderStatus.SNDR_NORMAL;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_note")
@EntityListeners(AuditingEntityListener.class)
public class Note {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long noteNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender", referencedColumnName = "emplyCode")
    private Employee sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient", referencedColumnName = "emplyCode")
    private Employee recipient;

    @Column(nullable = false)
    private String noteTitle;

    @Column(nullable = false)
    private String noteContent;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime sentAt;

    private LocalDateTime readAt;

    @Enumerated(value = STRING)
    @Column(nullable = false)
    private RecipientStatus recipientStatus = RCVR_NORMAL;

    @Enumerated(value = STRING)
    @Column(nullable = false)
    private SenderStatus senderStatus = SNDR_NORMAL;

    private LocalDateTime senderTrashAt;          // 발신자 휴지통 이후 삭제 (완전 삭제)

    private LocalDateTime recipientTrashAt;       // 수신자 휴지통 이후 삭제 (완전 삭제)

}
