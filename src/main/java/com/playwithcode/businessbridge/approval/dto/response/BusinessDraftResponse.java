package com.playwithcode.businessbridge.approval.dto.response;

import com.playwithcode.businessbridge.approval.domain.BusinessDraft;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.io.File;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class BusinessDraftResponse {

    private final String title;                             // 제목
    private final String docForm;                           // 문서 양식 이름
    private final List<Map<String, String>> approvers;      // 결재자 정보
    private final String drafterId;                           // 기안자 사번
    private final String drafterName;                       // 기안자 이름
    private final String departmentName;                    // 기안자 부서
    private final LocalDateTime draftDateTime;              // 기안 일시
    private final Long DocNo;                               // 문서 번호
    private final String businessDraftContent;              // 내용
    private final List<String> attachFile;                  // 첨부파일


    public static BusinessDraftResponse from(final BusinessDraft businessDraft){

        // 결재자에 대한 정보를 가공하는 처리
        List<Map<String,String>> approvers = businessDraft.getApproval().getApproverMember().stream().map(approver ->{
            Map<String, String> resultMap =  new HashMap<>();
            resultMap.put("positionName", approver.getApproverMember().getPosition().getPositionName());
            resultMap.put("approverId", approver.getApproverMember().getEmplyId());
            resultMap.put("approverName", approver.getApproverMember().getEmplyName());
            resultMap.put("approvalStatus", approver.getApprovalStatus().getValue());
            resultMap.put("approvalDateTime", String.valueOf(approver.getApprovalDateTime()));
            resultMap.put("approverImg", approver.getApproverMember().getEmplyPhoto());
            resultMap.put("approvalOpinion", approver.getApprovalOpinion());

            return resultMap;
        }).collect(Collectors.toList());

        // 첨부파일
        List<String> attachFiles = businessDraft.getApproval().getFile()
                .stream().map(file -> file.getPathName()).collect(Collectors.toList());

        return new BusinessDraftResponse(
                businessDraft.getApproval().getTitle(),
                businessDraft.getApproval().getDocForm().getValue(),
                approvers,
                businessDraft.getApproval().getDraftMember().getEmplyId(),
                businessDraft.getApproval().getDraftMember().getEmplyName(),
                businessDraft.getApproval().getDraftMember().getDepartment().getDepartmentName(),
                businessDraft.getApproval().getRegistDateTime(),
                businessDraft.getApproval().getDocNo(),
                businessDraft.getBusinessDraftContent(),
                attachFiles
        );

    }

}


