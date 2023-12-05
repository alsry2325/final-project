package com.playwithcode.businessbridge.approval.dto.response;

import com.playwithcode.businessbridge.approval.domain.BusinessDraft;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class BusinessDraftResponse {

    private final String title;                             // 제목
    private final String docForm;                           // 문서 양식 이름
    private final List<String> positionName;                // 결재자 직급
    private final List<String> approverName;                // 결재자 이름
    private final List<String> approvalStatus;              // 결재 상태
    private final List<LocalDateTime> approvalDateTime;     // 결재 일시
    private final String drafterName;                       // 기안자 이름
    private final String departmentName;                    // 기안자 부서
    private final LocalDateTime draftDateTime;              // 기안 일시
    private final int DocNo;                                // 문서 번호
    private final String businessDraftContent;              // 내용
    private final List<String> attachFile;                  // 첨부파일
    private final List<String> approverImg;                 // 결재자 프로필 이미지
    private final List<String> approvalOpinion;             // 결재 의견


    public static BusinessDraftResponse from(final BusinessDraft businessDraft){

        // 결재자에 대한 정보를 가공하는 처리
        List<String> positionNames = businessDraft.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApproverMember().getPosition().getPositionName())
                .collect(Collectors.toList());

        List<String> approverNames = businessDraft.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApproverMember().getEmplyName())
                .collect(Collectors.toList());

        List<String> approvalStatuses = businessDraft.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApprovalStatus().getValue())
                .collect(Collectors.toList());

        List<LocalDateTime> approvalDateTime = businessDraft.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApprovalDateTime())
                .collect(Collectors.toList());

        List<String> approverImgs = businessDraft.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApproverMember().getEmplyPhoto())
                .collect(Collectors.toList());

        List<String> approvalOpinions = businessDraft.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApprovalOpinion())
                .collect(Collectors.toList());

        // 첨부파일
        List<String> attachFiles = businessDraft.getApproval().getFile()
                .stream().map(file -> file.getPathName()).collect(Collectors.toList());

        return new BusinessDraftResponse(
                businessDraft.getApproval().getTitle(),
                businessDraft.getApproval().getDocForm().getValue(),
                positionNames,
                approverNames,
                approvalStatuses,
                approvalDateTime,
                businessDraft.getApproval().getDraftMember().getEmplyName(),
                businessDraft.getApproval().getDraftMember().getDepartment().getDepartmentName(),
                businessDraft.getApproval().getDraftDateTime(),
                businessDraft.getApproval().getDocNo(),
                businessDraft.getBusinessDraftContent(),
                attachFiles,
                approverImgs,
                approvalOpinions
        );

    }

}


