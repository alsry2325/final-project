package com.playwithcode.businessbridge.approval.service;

import com.playwithcode.businessbridge.approval.domain.Approval;
import com.playwithcode.businessbridge.approval.domain.Approver;
import com.playwithcode.businessbridge.approval.domain.repository.ApprovalRepository;
import com.playwithcode.businessbridge.approval.dto.request.ApprovalCreateRequest;
import com.playwithcode.businessbridge.approval.dto.response.ReceivedApprovalResponse;
import com.playwithcode.businessbridge.jwt.CustomUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType.ACTIVATE;

@Service
@RequiredArgsConstructor
@Transactional
public class ApprovalService {

    private final ApprovalRepository approvalRepository;

    private Pageable getPageable(final Integer page){
        return PageRequest.of(page - 1, 10,
                Sort.by("approvalCode"));
    }


//    /* 1. 받은 결재 목록 조회 */
//    @Transactional(readOnly = true)
//    public Page<ReceivedApprovalResponse> getReceivedApprovals(final Integer page) {
//
//        Page<Approver> approvals = approvalRepository.findByApprovalStatus(getPageable(page), ACTIVATE);
//
//        return approvals.map(approval -> ReceivedApprovalResponse.from(approval.getApproval()));
//    }

    /* 2. 새 결재 작성(결재 등록) */
    public void save(ApprovalCreateRequest approvalCreateRequest, CustomUser customUser) {
    }
}
