package com.playwithcode.businessbridge.approval.presentation;

import com.playwithcode.businessbridge.approval.domain.type.DocStatusType;
import com.playwithcode.businessbridge.approval.dto.request.BusinessDraftCreateRequest;
import com.playwithcode.businessbridge.approval.dto.request.ExpenseReportCreateRequest;
import com.playwithcode.businessbridge.approval.dto.response.DraftApprovalResponse;
import com.playwithcode.businessbridge.approval.service.ApprovalService;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/approval")
public class ApprovalController {

    private final ApprovalService approvalService;

    /* 1-1. 업무기안서 등록(결재 등록) */
    @PostMapping("/regist-business-draft")
    public ResponseEntity<Void> save(@RequestPart @Valid BusinessDraftCreateRequest businessDraftRequest,
                                     @RequestPart(required = false) List<MultipartFile> attachFiles,
                                     @AuthenticationPrincipal Employee loginUser){
        if (attachFiles == null) {
            // 첨부 파일이 제공되지 않았을 경우, null 참조 오류를 방지하기 위해 빈 목록을 생성
            attachFiles = Collections.emptyList();
        }

        approvalService.businessDraftSave(businessDraftRequest, attachFiles, loginUser);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /* 1-2. 지출결의서 등록(새 결재 등록) */
    @PostMapping("/regist-expense_report")
    public ResponseEntity<Void> save(@RequestPart @Valid ExpenseReportCreateRequest expenseReportRequest,
                                     @RequestPart(required = false) List<MultipartFile> attachFiles,
                                     @AuthenticationPrincipal Employee loginUser){

        if (attachFiles == null) {
            // 첨부 파일이 제공되지 않았을 경우, null 참조 오류를 방지하기 위해 빈 목록을 생성
            attachFiles = Collections.emptyList();
        }

        approvalService.expenseReportSave(expenseReportRequest, attachFiles, loginUser);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /* 2. 기안한 문서함 목록 조회 - 상태별 조회, 페이징 */
    @GetMapping("/draft-docs/{docStatus}")
    public ResponseEntity<PagingResponse> getReceivedApprovalsByStatus(
            @RequestParam(defaultValue = "1") final Integer page,
            @PathVariable String docStatus,
            @AuthenticationPrincipal CustomUser customUser){

        final Page<DraftApprovalResponse> approvals = approvalService.getDraftApprovals(page, docStatus, customUser);

        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

}
