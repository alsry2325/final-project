package com.playwithcode.businessbridge.approval.domain.repository;

import com.playwithcode.businessbridge.approval.domain.Approval;
import com.playwithcode.businessbridge.approval.domain.Approver;
import com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType;
import com.playwithcode.businessbridge.approval.domain.type.DocStatusType;
import com.playwithcode.businessbridge.approval.service.ApprovalService;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApprovalRepository extends JpaRepository<Approval, Long> {

    /* 2-1. 받은 결재 목록 조회 - 상태 전체 조회, 페이징 */
    @Query("SELECT a FROM Approval a " +
            "JOIN a.approverMember approver " +
            "WHERE approver.approverMember.emplyCode = :emplyCode " +
            "AND approver.approvalStatus = 'ACTIVATE' or approver.approvalStatus = 'PENDING' " +
            "AND a.docStatus = 'WAITING' or a.docStatus = 'PROCEEDING'")
    Page<Approval> findApprovals(Pageable pageable, @Param("emplyCode") Long emplyCode);

    /* 2-2. 받은 결재 목록 조회 - 상태별 조회, 페이징 */
    @Query("SELECT a FROM Approval a " +
            "JOIN a.approverMember approver " +
            "WHERE approver.approverMember.emplyCode = :emplyCode " +
            "AND approver.approvalStatus = 'ACTIVATE' " +
            "AND a.docStatus IN :docStatusType")
    Page<Approval> findApprovals(
            Pageable pageable,
            @Param("emplyCode") Long emplyCode,
            @Param("docStatusType")DocStatusType docStatusType);

    /* 3. 받은 결재 목록 조회 */
    @Query("SELECT a FROM Approval a " +
            "JOIN a.approverMember approver " +
            "WHERE approver.approverMember.emplyCode = :emplyCode " +
            "AND approver.approvalStatus = 'WAITING' " +
            "AND a.docStatus = 'WAITING' or a.docStatus = 'PROCEEDING'")
    Page<Approval> findApprovalsByApproverMember(Pageable pageable, @Param("emplyCode") Long emplyCode);

    /* 4-1. 기안 회수함 목록 조회 - 상태별 조회, 페이징 */
    Page<Approval> findByDraftMemberEmplyCodeAndDocStatusNotLikeAndDocStatusNotLike
    (Pageable pageable, Long emplyCode, DocStatusType docStatusType1, DocStatusType docStatusType2);

    /* 4-2. 기안한 결재 목록 조회 */
    Page<Approval> findByDraftMemberEmplyCodeAndDocStatus(Pageable pageable, Long emplyCode, DocStatusType docStatus);

    /* 5,6. 기안 회수함, 임시 저장한 목록 조회 - 페이징 */
    Page<Approval> findByDraftMemberEmplyCodeAndDocStatusLike(Pageable pageable, Long emplyCode, DocStatusType docStatusType);

    /* 7-1. 결재한 문서함 - 전체 조회, 페이징 */
    /* 7-2. 결재한 문서함 - 상태별 조회, 페이징 */
}
