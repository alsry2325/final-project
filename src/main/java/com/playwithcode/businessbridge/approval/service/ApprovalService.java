package com.playwithcode.businessbridge.approval.service;

import com.playwithcode.businessbridge.approval.domain.Approval;
import com.playwithcode.businessbridge.approval.domain.Approver;
import com.playwithcode.businessbridge.approval.domain.BusinessDraft;
import com.playwithcode.businessbridge.approval.domain.repository.ApprovalRepository;
import com.playwithcode.businessbridge.approval.domain.repository.BusinessDraftRepository;
import com.playwithcode.businessbridge.approval.dto.request.BusinessDraftCreateRequest;
import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.jwt.CustomUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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


//    /* 1. 받은 결재 목록 조회 */
//    @Transactional(readOnly = true)
//    public Page<ReceivedApprovalResponse> getReceivedApprovals(final Integer page) {
//
//        Page<Approver> approvals = approvalRepository.findByApprovalStatus(getPageable(page), ACTIVATE);
//
//        return approvals.map(approval -> ReceivedApprovalResponse.from(approval.getApproval()));
//    }

    /* 2. 업무기안서 등록(결재 등록) */
    public void save(BusinessDraftCreateRequest businessDraftCreateRequest, CustomUser customUser) {

//        Approval approval = approvalRepository.findById(
//                businessDraftCreateRequest.getApprovalCode())
//                .orElseThrow(() -> new NotFoundException(NOT_FOUND_APPROVAL_CODE));
//
//        final BusinessDraft newBusinessDraft = BusinessDraft.of(
//                approval,
//                businessDraftCreateRequest.getBusinessDraftContent()
//        );
//
//        businessDraftRepository.save(newBusinessDraft);

//        List<Approver> approvers = new ArrayList<>();

        // 전자결재에 추가 결재자에 추가,,
//        Approval newApproval = Approval.of(
//                businessDraftCreateRequest.getApproverMember(),
//                customUser,
//                businessDraftCreateRequest.getTitle(),
//                "업무기안서"
//        );

    }

}
