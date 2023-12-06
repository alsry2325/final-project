package com.playwithcode.businessbridge.approval.presentation;

import com.playwithcode.businessbridge.approval.dto.request.*;
import com.playwithcode.businessbridge.approval.dto.response.*;
import com.playwithcode.businessbridge.approval.service.ApprovalService;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/approval")
public class ApprovalController {

    private final ApprovalService approvalService;
    private final MemberService memberService;

    /* -------------------------------------------------- 결재 등록 -------------------------------------------------- */

    /* 1-1. 업무기안서 등록(결재 등록) */
    @PostMapping("/regist-business-draft")
    public ResponseEntity<Void> save(@RequestPart @Valid BusinessDraftCreateRequest businessDraftRequest,
                                     @RequestPart(required = false) List<MultipartFile> attachFiles,
                                     @AuthenticationPrincipal CustomUser customUser){

        log.info("customUser : {}", customUser);

        if (attachFiles == null) {
            // 첨부 파일이 제공되지 않았을 경우, null 참조 오류를 방지하기 위해 빈 목록을 생성
            attachFiles = Collections.emptyList();
        }

        approvalService.businessDraftSave(businessDraftRequest, attachFiles, customUser);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /* 1-2. 지출결의서 등록(새 결재 등록) */
    @PostMapping("/regist-expense_report")
    public ResponseEntity<Void> save(@RequestPart @Valid ExpenseReportCreateRequest expenseReportRequest,
                                     @RequestPart(required = false) List<MultipartFile> attachFiles,
                                     @AuthenticationPrincipal CustomUser customUser){

        if (attachFiles == null) {
            // 첨부 파일이 제공되지 않았을 경우, null 참조 오류를 방지하기 위해 빈 목록을 생성
            attachFiles = Collections.emptyList();
        }

        approvalService.expenseReportSave(expenseReportRequest, attachFiles, customUser);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /* -------------------------------------------------- 목록 조회 -------------------------------------------------- */

    /* 2-1. 받은 결재 목록 조회 - 상태 전체 조회, 페이징 */
    @GetMapping("/receive-approvals/all")
    public ResponseEntity<PagingResponse> getReceiveApprovals(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser
    ){
        Page<ReceiveListResponse> approvals = approvalService.getReceivedApprovals(page, customUser);

        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 2-2. 받은 결재 목록 조회 - 상태별 조회, 페이징 */
    @GetMapping("/receive-approvals/{docStatus}")
    public ResponseEntity<PagingResponse> getReceiveApprovalsByStatus(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser,
            @PathVariable String docStatus){

        final Page<ReceiveListResponse> approvals = approvalService.getReceivedApprovalsByStatus(page, docStatus, customUser);

        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 3. 받을 결재 목록 조회 */
    @GetMapping("/upcoming-approvals")
    public ResponseEntity<PagingResponse> getUpcomingApprovals(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser){

        final Page<ReceiveListResponse> approvals = approvalService.getUpcomingApprovals(page, customUser);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }


    /* 4-1. 기안한 문서함 목록 전체 조회 - 페이징 */
    @GetMapping("/draft-docs/all")
    public ResponseEntity<PagingResponse> getDraftApprovals(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser){

        final Page<DraftListResponse> approvals = approvalService.getDraftApprovals(page, customUser);

        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 4-2. 기안한 문서함 목록 조회 - 상태별 조회, 페이징 */
    @GetMapping("/draft-docs/{docStatus}")
    public ResponseEntity<PagingResponse> getDraftApprovalsByStatus(
            @RequestParam(defaultValue = "1") final Integer page,
            @PathVariable String docStatus,
            @AuthenticationPrincipal CustomUser customUser){

        final Page<DraftListResponse> approvals = approvalService.getDraftApprovalsByStatus(page, docStatus, customUser);

        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 5. 기안 회수함 목록 조회 - 페이징 */
    @GetMapping("/collect-draft-docs")
    public ResponseEntity<PagingResponse> getCollectApprovals(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser){

        final Page<DraftListResponse> approvals = approvalService.getCollectDraftApprovals(page, customUser);

        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 6. 임시 저장한 목록 조회 - 페이징 */
    @GetMapping("/tempSave-draft-docs")
    public ResponseEntity<PagingResponse> getTempSaveApprovals(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser){

        final Page<DraftListResponse> approvals = approvalService.getTempSaveDraftApprovals(page, customUser);

        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 7-1. 결재한 문서함 - 전체 조회, 페이징 */
    @GetMapping("/approve-docs/all")
    public ResponseEntity<PagingResponse> getApproveApprovals(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser
    ){

        final Page<ReceiveListResponse> approvals = approvalService.getApproveApprovals(page,customUser);

        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 7-2. 결재한 문서함 - 상태별 조회, 페이징 */
    @GetMapping("/approve-docs/{docStatus}")
    public ResponseEntity<PagingResponse> getApproveApprovalsByStatus(
            @RequestParam(defaultValue = "1") final Integer page,
            @AuthenticationPrincipal CustomUser customUser,
            @PathVariable String docStatus
    ){

        final Page<ReceiveListResponse> approvals = approvalService.getApproveApprovalsByStatus(page,customUser, docStatus);

        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* -------------------------------------------------- 상세 조회 -------------------------------------------------- */

    /* 8. 업무기안서 상세 조회 */
    @GetMapping("/document/businessDraft/{approvalCode}")
    public ResponseEntity<BusinessDraftResponse> getBusinessDraft(@PathVariable final Long approvalCode){

        final BusinessDraftResponse businessDraftResponse = approvalService.getBusinessDraft(approvalCode);

        return ResponseEntity.ok(businessDraftResponse);
    }

    /* 9. 지출결의서 상세 조회 */
    @GetMapping("/document/expenseReport/{approvalCode}")
    public ResponseEntity<ExpenseReportResponse> getExpenseReport(@PathVariable final Long approvalCode){

        final ExpenseReportResponse expenseReportResponse = approvalService.getExpenseReport(approvalCode);

        return ResponseEntity.ok(expenseReportResponse);
    }

    /* -------------------------------------------------- 결재 수정 -------------------------------------------------- */

    /* 10. 업무기안서 수정 */
    @PutMapping("/update/businessDraft/{approvalCode}")
    public ResponseEntity<Void> businessdraftUpdate(@PathVariable final Long approvalCode,
                                                    @RequestPart @Valid final BusinessDraftUpdateRequest businessDraftUpdate,
                                                    @RequestPart(required = false) final List<MultipartFile> attachFiles){
        approvalService.businessDraftUpdate(approvalCode, attachFiles, businessDraftUpdate);

        return ResponseEntity.created(URI.create("/document/businessDraft/" + approvalCode)).build();
    }

    /* 11. 지출결의서 수정 */
    @PutMapping("/update/expenseReport/{approvalCode}")
    public ResponseEntity<Void> expenseReportUpdate(@PathVariable final Long approvalCode,
                                                    @RequestPart @Valid final ExpenseReportUpdateRequest expenseReportUpdate,
                                                    @RequestPart(required = false) final List<MultipartFile> attachFiles){
        approvalService.expenseReportUpdate(approvalCode, attachFiles, expenseReportUpdate);

        return ResponseEntity.created(URI.create("/document/expenseReport/" + approvalCode)).build();
    }

    /* -------------------------------------------------- 문서 회수  -------------------------------------------------- */

    /* 12. 기안 문서 회수 */
    @PatchMapping("/collect/{approvalCode}")
    public ResponseEntity<Void> collectApproval(@PathVariable final Long approvalCode,
                                                @AuthenticationPrincipal CustomUser customUser){

        approvalService.collectApproval(approvalCode, customUser);

        return ResponseEntity.created(URI.create("/document/" + approvalCode)).build();
    }

    /* -------------------------------------------------- 결재자  -------------------------------------------------- */

    /* 13. 결재자 결재 - 승인 */
    @PatchMapping("/confirm/{approvalCode}")
    public ResponseEntity<Void> confirmApproval(@PathVariable final Long approvalCode,
                                                @AuthenticationPrincipal CustomUser customUser,
                                                @RequestBody ApprovalRequest approvalRequest){
        approvalService.confirmApproval(approvalCode, customUser, approvalRequest);

        return null;
    }

    /* 15. 결재자 결재 - 보류 */
    @PatchMapping("/pending/{approvalCode}")
    public ResponseEntity<Void> pendingApproval(@PathVariable final Long approvalCode){

        approvalService.pendingApproval(approvalCode);

        return null;
    }

    /* -------------------------------------------------- 직원 조회  -------------------------------------------------- */
    /* 15. 모달창 결재자 선택 직원 조회 */
    @GetMapping("/allEmployeeList")
    public ResponseEntity<List<AllEmployeeResponse>> getAllEmployeeList(){
        List<AllEmployeeResponse> allEmployeeResponse = memberService.getAllEmployeeList();

        return ResponseEntity.ok(allEmployeeResponse);
    }
}
