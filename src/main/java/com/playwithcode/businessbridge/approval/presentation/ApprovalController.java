package com.playwithcode.businessbridge.approval.presentation;

import com.playwithcode.businessbridge.approval.dto.response.ReceivedApprovalResponse;
import com.playwithcode.businessbridge.approval.service.ApprovalService;
import com.playwithcode.businessbridge.common.paging.Pagination;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/approval")
public class ApprovalController {

    private final ApprovalService approvalService;

    /* 1. 받은 결재 목록 조회 - 결재자의 결재 상태가 활성화인 경우 */
    @GetMapping("/receive")
    public ResponseEntity<PagingResponse> getReceivedApprovals(
            @RequestParam(defaultValue = "1") final Integer page){

        final Page<ReceivedApprovalResponse> approvals = approvalService.getReceivedApprovals(page);

        final PagingButtonInfo pagingButtonInfo = Pagination.getPagingButtonInfo(approvals);
        final PagingResponse pagingResponse = PagingResponse.of(approvals.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }
}
