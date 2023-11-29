package com.playwithcode.businessbridge.approval.presentation;

import com.playwithcode.businessbridge.approval.dto.request.BusinessDraftCreateRequest;
import com.playwithcode.businessbridge.approval.dto.request.ExpenseReportCreateRequest;
import com.playwithcode.businessbridge.approval.service.ApprovalService;
import com.playwithcode.businessbridge.member.domain.Employee;
import lombok.RequiredArgsConstructor;
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

    /* 1. 받은 결재 목록 조회 - 결재자의 결재 상태가 활성화인 경우 */
//    @GetMapping("/receive")
//    public ResponseEntity<PagingResponse> getReceivedApprovals(
//            @RequestParam(defaultValue = "1") final Integer page){
//
//        final Page<ReceivedApprovalResponse> approvals = approvalService.getReceivedApprovals(page);
//
//        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
//        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);
//
//        return ResponseEntity.ok(pagingResponse);
//    }

    /* 2-1. 업무기안서 등록(결재 등록) */
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

    /* 2-2. 지출결의서 등록(새 결재 등록) */
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
}
