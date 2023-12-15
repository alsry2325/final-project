package com.playwithcode.businessbridge.approval.dto.response;

import com.playwithcode.businessbridge.approval.domain.ExpenseReport;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ExpenseReportResponse {

    private final String title;                                 // 제목
    private final String docForm;                               // 문서 양식
    private final List<Map<String, String>> approvers;          // 결재자 정보
    private final String drafterName;                           // 기안자
    private final String departmentName;                        // 기안자 부서
    private final LocalDateTime draftDateTime;                  // 기안 일시
    private final Long docNo;                                    // 문서 번호
    private final Long totalExpenditure;                        // 총지출 금액
    private final List<Map<String, String>> details;            // 지출결의 상세
    private final List<String> attachFiles;                     // 첨부파일

    public static ExpenseReportResponse from(final ExpenseReport expenseReport){

        // 결재자에 대한 정보를 가공하는 처리
        List<Map<String,String>> approvers = expenseReport.getApproval().getApproverMember().stream().map(approver ->{
            Map<String, String> resultMap =  new HashMap<>();
            resultMap.put("positionName", approver.getApproverMember().getPosition().getPositionName());
            resultMap.put("approverName", approver.getApproverMember().getEmplyName());
            resultMap.put("approvalStatus", approver.getApprovalStatus().getValue());
            resultMap.put("approvalDateTime", String.valueOf(approver.getApprovalDateTime()));
            resultMap.put("approverImg", approver.getApproverMember().getEmplyPhoto());
            resultMap.put("approvalOpinion", approver.getApprovalOpinion());

            return resultMap;
        }).collect(Collectors.toList());

        // 지출결의서 상세 내용 가공 처리
        List<Map<String, String>> details = expenseReport.getExpenseReportDetail().stream().map(detail -> {
            Map<String, String> resultMap = new HashMap<>();
            resultMap.put("detailCode", String.valueOf(detail.getExpenseDetailCode()));
            resultMap.put("item", detail.getItem());
            resultMap.put("amount", String.valueOf(detail.getAmount()));
            resultMap.put("note", detail.getNote());
            return resultMap;
        }).collect(Collectors.toList());

//        List<String> items = expenseReport.getExpenseReportDetail()
//                .stream().map(detail -> detail.getItem()).collect(Collectors.toList());
//
//        List<Long> amounts = expenseReport.getExpenseReportDetail()
//                .stream().map(detail -> detail.getAmount()).collect(Collectors.toList());
//
//        List<String> notes = expenseReport.getExpenseReportDetail()
//                .stream().map(detail -> detail.getNote()).collect(Collectors.toList());

        // 첨부파일
        List<String> attachFiles = expenseReport.getApproval().getFile()
                .stream().map(file -> file.getPathName()).collect(Collectors.toList());

        return new ExpenseReportResponse(
                expenseReport.getApproval().getTitle(),
                expenseReport.getApproval().getDocForm().getValue(),
                approvers,
                expenseReport.getApproval().getDraftMember().getEmplyName(),
                expenseReport.getApproval().getDraftMember().getDepartment().getDepartmentName(),
                expenseReport.getApproval().getRegistDateTime(),
                expenseReport.getApproval().getDocNo(),
                expenseReport.getTotalExpenditure(),
                details,
                attachFiles
        );
    }
}
