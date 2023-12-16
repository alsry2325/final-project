package com.playwithcode.businessbridge.approval.domain.repository;

import com.playwithcode.businessbridge.approval.domain.Approval;
import com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType;
import com.playwithcode.businessbridge.approval.domain.type.DocStatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApprovalRepository extends JpaRepository<Approval, Long> {

    /* 2-1. 받은 결재 목록 조회 - 상태 전체 조회, 페이징 */
    @Query("SELECT a FROM Approval a " +
            "JOIN a.approverMember approver " +
            "WHERE approver.approverMember.emplyCode = :emplyCode " +
            "AND (a.docStatus = 'WAITING' or a.docStatus = 'PROCEEDING') " +
            "AND (approver.approvalStatus = 'ACTIVATE' or approver.approvalStatus = 'PENDING') ")
    Page<Approval> findApprovals(Pageable pageable, Long emplyCode);

    /* 2-2. 받은 결재 목록 조회 - 상태별 조회, 페이징 */
    @Query("SELECT a FROM Approval a " +
            "JOIN a.approverMember approver " +
            "WHERE approver.approverMember.emplyCode = :emplyCode " +
            "AND approver.approvalStatus IN :approvalStatusType")
    Page<Approval> findApprovals(
            Pageable pageable,
            @Param("emplyCode") Long emplyCode,
            @Param("approvalStatusType")ApprovalStatusType approvalStatusType);

    /* 3. 받을 결재 목록 조회 */
    @Query("SELECT a FROM Approval a " +
            "JOIN a.approverMember approver " +
            "WHERE approver.approverMember.emplyCode = :emplyCode " +
            "AND approver.approvalStatus = 'WAITING' " +
            "AND (a.docStatus = 'WAITING' or a.docStatus = 'PROCEEDING') ")
    Page<Approval> findApprovalsByApproverMember(Pageable pageable, Long emplyCode);

    /* 4-1. 기안 회수함 목록 조회 - 상태별 조회, 페이징 */
    Page<Approval> findByDraftMemberEmplyCodeAndDocStatusNotLikeAndDocStatusNotLike
    (Pageable pageable, Long emplyCode, DocStatusType docStatusType1, DocStatusType docStatusType2);

    /* 4-2. 기안한 결재 목록 조회 */
    Page<Approval> findByDraftMemberEmplyCodeAndDocStatus(Pageable pageable, Long emplyCode, DocStatusType docStatus);

    /* 5,6. 기안 회수함, 임시 저장한 목록 조회 - 페이징 */
    Page<Approval> findByDraftMemberEmplyCodeAndDocStatusLike(Pageable pageable, Long emplyCode, DocStatusType docStatusType);

    /* 7-1. 결재한 문서함 - 전체 조회, 페이징 */
    @Query("SELECT a FROM Approval a " +
            "JOIN a.approverMember approver " +
            "WHERE approver.approverMember.emplyCode = :emplyCode " +
            "AND (approver.approvalStatus = 'CONFIRM' or approver.approvalStatus = 'RETURN')")
    Page<Approval> findByApproverMember(Pageable pageable, Long emplyCode);

    /* 7-2. 결재한 문서함 - 상태별 조회, 페이징 */
    @Query("SELECT a FROM Approval a " +
            "JOIN a.approverMember approver " +
            "WHERE approver.approverMember.emplyCode = :emplyCode " +
            "AND (approver.approvalStatus = 'CONFIRM' or approver.approvalStatus = 'RETURN')" +
            "AND a.docStatus IN :docStatusType")
    Page<Approval> findByApproverMember(Pageable pageable, Long emplyCode, DocStatusType docStatusType);

    /* 12. 문서 회수 */
    Optional<Approval> findByApprovalCodeAndDraftMemberEmplyCode(Long approvalCode, Long emplyCode);

    /* 13. 결재자 결재 - 승인 */
    Optional<Approval> findByApprovalCodeAndApproverMemberAndDocStatusLike(Long approvalCode, Long emplyCode, ApprovalStatusType docStatus);


    List<Approval> findByDocStatus(DocStatusType docStatusType);
}
