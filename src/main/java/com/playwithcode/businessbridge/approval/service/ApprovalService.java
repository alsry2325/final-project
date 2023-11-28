package com.playwithcode.businessbridge.approval.service;

import com.playwithcode.businessbridge.approval.domain.*;
import com.playwithcode.businessbridge.approval.domain.repository.ApprovalRepository;
import com.playwithcode.businessbridge.approval.domain.repository.BusinessDraftRepository;
import com.playwithcode.businessbridge.approval.domain.type.DocFormType;
import com.playwithcode.businessbridge.approval.dto.request.BusinessDraftCreateRequest;
import com.playwithcode.businessbridge.approval.dto.request.ExpenseReportCreateRequest;
import com.playwithcode.businessbridge.approval.dto.response.ReceivedApprovalResponse;
import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType.ACTIVATE;
import static com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType.WAITING;
import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.NOT_FOUND_APPROVAL_CODE;

@Service
@RequiredArgsConstructor
@Transactional
public class ApprovalService {

    private final ApprovalRepository approvalRepository;
    private final BusinessDraftRepository businessDraftRepository;

    private Pageable getPageable(final Integer page){
        return PageRequest.of(page - 1, 10,
                Sort.by("approvalCode"));
    }


    /* 1. 받은 결재 목록 조회 */
//    @Transactional(readOnly = true)
//    public Page<ReceivedApprovalResponse> getReceivedApprovals(final Integer page) {
//
//        Page<Approval> approvals = approvalRepository.findByStatus(getPageable(page), ACTIVATE);
//
//        return approvals.map(approval -> ReceivedApprovalResponse.from(approval));
//    }

    /* 2. 업무기안서 등록(결재 등록) */
    public void businessDraftSave(BusinessDraftCreateRequest businessDraftRequest,
                     MultipartFile attachFile, Employee loginUser) {

        // 결재자 엔터티 추가
        List<Approver> approverMember = new ArrayList<>();
        for(int i = 0; i < businessDraftRequest.getApproverMember().size(); i++) {
            if(i == 0) {
                approverMember.add(Approver.of(businessDraftRequest.getApproverMember().get(i), i+1L, ACTIVATE));
            } else {
                approverMember.add(Approver.of(businessDraftRequest.getApproverMember().get(i), i+1L, WAITING));
            }
        }

        // 전자결재 엔터티 추가
        Approval newApproval = Approval.of(
                approverMember,
                loginUser,
                businessDraftRequest.getTitle(),
                DocFormType.valueOf("businessDraft")
        );

        // 업무기안서 엔티티 추가
        final BusinessDraft newBusinessDraft = BusinessDraft.of(
                newApproval,
                businessDraftRequest.getBusinessDraftContent()
        );

        businessDraftRepository.save(newBusinessDraft);

    }

    /* 지출 결의서 등록 */
    public void expenseReportSave(ExpenseReportCreateRequest expenseReportRequest, MultipartFile attachFile, Employee loginUser) {

        // 결재자 엔터티 추가
        List<Approver> approverMember = new ArrayList<>();
        for(int i = 0; i < expenseReportRequest.getApproverMember().size(); i++) {
            if(i == 0) {
                approverMember.add(Approver.of(expenseReportRequest.getApproverMember().get(i), i+1L, ACTIVATE));
            } else {
                approverMember.add(Approver.of(expenseReportRequest.getApproverMember().get(i), i+1L, WAITING));
            }
        }

        // 전자결재 엔터티 추가
        Approval newApproval = Approval.of(
                approverMember,
                loginUser,
                expenseReportRequest.getTitle(),
                DocFormType.valueOf("expenseReport")
        );

        // 지출 결의서 상세 엔터티 추가
//        List<ExpenseReportDetail> expenseReportDetail = new ArrayList<>();
//        for (int i = 0; i < expenseReportRequest.; i++) {
//
//        }
//
//
//        // 지출 결의서 엔터티 추가
//        final ExpenseReport newExpenseReport = ExpenseReport.of(
//                newApproval,
//                expenseReportRequest.getTotalExpenditure(),
//                // 지출결의서 상세 엔터티
//        );
    }
}
