package com.playwithcode.businessbridge.approval.dto.response;

import com.playwithcode.businessbridge.approval.domain.ExpenseReport;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ExpenseReportResponse {

    private final String title;                                 // 제목
    private final String docForm;                               // 문서 양식
    private final List<String> positionName;                    // 결재자 직급
    private final List<String> approverName;                    // 결재자 이름
    private final List<String> approvalStatus;                  // 결재 상태
    private final List<LocalDateTime> approvalDateTime;         // 결재자 결재 일시
    private final String drafterName;                           // 기안자
    private final String departmentName;                        // 기안자 부서
    private final LocalDateTime draftDateTime;                  // 기안 일시
    private final Long docNo;                                   // 문서 번호
    private final Long totalExpenditure;                        // 총지출 금액
    private final List<String> item;                            // 적요
    private final List<Long> amount;                            // 금액
    private final List<String> note;                            // 비고
    private final List<String> attachFiles;                     // 첨부파일
    private final List<String> approverImg;                     // 결재자 프로필 이미지
    private final List<String> approvalOpinion;                 // 결재 의견

    public static ExpenseReportResponse from(final ExpenseReport expenseReport){

        // 결재자에 대한 정보를 가공하는 처리
        List<String> positionNames = expenseReport.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApproverMember().getPosition().getPositionName())
                .collect(Collectors.toList());

        List<String> approverNames = expenseReport.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApproverMember().getEmplyName())
                .collect(Collectors.toList());

        List<String> approvalStatuses = expenseReport.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApprovalStatus().getValue())
                .collect(Collectors.toList());

        List<LocalDateTime> approvalDateTimes = expenseReport.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApprovalDateTime())
                .collect(Collectors.toList());

        List<String> approverImgs = expenseReport.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApproverMember().getEmplyPhoto())
                .collect(Collectors.toList());

        List<String> approvalOpinions = expenseReport.getApproval().getApproverMember()
                .stream().map(approver -> approver.getApprovalOpinion()).collect(Collectors.toList());

        // 지출결의서 상세 내용 가공 처리
        List<String> items = expenseReport.getExpenseReportDetail()
                .stream().map(detail -> detail.getItem()).collect(Collectors.toList());

        List<Long> amounts = expenseReport.getExpenseReportDetail()
                .stream().map(detail -> detail.getAmount()).collect(Collectors.toList());

        List<String> notes = expenseReport.getExpenseReportDetail()
                .stream().map(detail -> detail.getNote()).collect(Collectors.toList());

        // 첨부파일
        List<String> attachFiles = expenseReport.getApproval().getFile()
                .stream().map(file -> file.getPathName()).collect(Collectors.toList());

        return new ExpenseReportResponse(
                expenseReport.getApproval().getTitle(),
                expenseReport.getApproval().getDocForm().getValue(),
                positionNames,
                approverNames,
                approvalStatuses,
                approvalDateTimes,
                expenseReport.getApproval().getDraftMember().getEmplyName(),
                expenseReport.getApproval().getDraftMember().getDepartment().getDepartmentName(),
                expenseReport.getApproval().getDraftDateTime(),
                expenseReport.getApproval().getDocNo(),
                expenseReport.getTotalExpenditure(),
                items,
                amounts,
                notes,
                attachFiles,
                approverImgs,
                approvalOpinions
        );
    }
}
