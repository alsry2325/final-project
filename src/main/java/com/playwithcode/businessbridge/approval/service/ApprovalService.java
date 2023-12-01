package com.playwithcode.businessbridge.approval.service;

import com.playwithcode.businessbridge.approval.domain.*;
import com.playwithcode.businessbridge.approval.domain.repository.ApprovalRepository;
import com.playwithcode.businessbridge.approval.domain.repository.BusinessDraftRepository;
import com.playwithcode.businessbridge.approval.domain.repository.ExpenseReportRepository;
import com.playwithcode.businessbridge.approval.domain.type.DocFormType;
import com.playwithcode.businessbridge.approval.domain.type.DocStatusType;
import com.playwithcode.businessbridge.approval.dto.request.BusinessDraftCreateRequest;
import com.playwithcode.businessbridge.approval.dto.request.ExpenseReportCreateRequest;
import com.playwithcode.businessbridge.approval.dto.request.ExpenseReportDetailCreateRequest;
import com.playwithcode.businessbridge.approval.dto.response.DraftListResponse;
import com.playwithcode.businessbridge.approval.dto.response.ReceiveListResponse;
import com.playwithcode.businessbridge.common.util.FileUploadUtils;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepositroy;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType.ACTIVATE;
import static com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType.WAITING;
import static com.playwithcode.businessbridge.approval.domain.type.DocStatusType.*;

@Service
@RequiredArgsConstructor
@Transactional
public class ApprovalService {

    private final ApprovalRepository approvalRepository;
    private final BusinessDraftRepository businessDraftRepository;
    private final ExpenseReportRepository expenseReportRepository;
    private final EmployeeRepositroy employeeRepositroy;

    @Value("http://localhost/approvalFiles/")
    private String FILE_URL;
    @Value("src/main/resources/upload/approvalFiles")
    private String FILE_DIR;

    private Pageable getPageable(final Integer page){
        return PageRequest.of(page - 1, 10,
                Sort.by("approvalCode"));
    }

    /* -------------------------------------------------- 결재 등록 -------------------------------------------------- */

    private String getRandomName() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /* 1-1. 업무기안서 등록(결재 등록) */
    public void businessDraftSave(BusinessDraftCreateRequest businessDraftRequest,
                                  List<MultipartFile> attachFiles, CustomUser customUser) {

        // 결재자 엔터티 추가
        List<Approver> approverMember = new ArrayList<>();
        for(int i = 0; i < businessDraftRequest.getApproverMember().size(); i++) {

            Employee approver = employeeRepositroy.getReferenceById(businessDraftRequest.getApproverMember().get(i));

            if(i == 0) {
                approverMember.add(Approver.of(approver, i+1L, ACTIVATE));
                // 생성하는 DTO에서 Long타입으로 정보를 받아오는데 저장되는 of메소드에서 approver의 타입은 Employee임
            } else {
                approverMember.add(Approver.of(approver, i+1L, WAITING));
            }
        }

        // 전달 된 파일을 서버의 지정 경로에 저장
        List<File> files = new ArrayList<>();

        for( MultipartFile attachFile : attachFiles ) {
            String replaceFileName = FileUploadUtils.saveFile(FILE_DIR, getRandomName(), attachFile);
            files.add(File.of(
                    attachFile.getOriginalFilename(),
                    "/upload/approvalFiles/",
                    replaceFileName,
                    attachFile.getOriginalFilename().substring(attachFile.getOriginalFilename().lastIndexOf("."))
            ));
        }

        Employee draftMember = employeeRepositroy.getReferenceById(customUser.getEmplyCode());

        // 전자결재 엔터티 추가
        Approval newApproval = Approval.of(
                approverMember,
                draftMember,
                businessDraftRequest.getTitle(),
                DocFormType.BUSINESS_DRAFT,
                files
        );

        // 업무기안서 엔티티 추가
        final BusinessDraft newBusinessDraft = BusinessDraft.of(
                newApproval,
                businessDraftRequest.getBusinessDraftContent()
        );

        businessDraftRepository.save(newBusinessDraft);
    }

    /* 1-2. 지출 결의서 등록(결재 등록) */
    public void expenseReportSave(ExpenseReportCreateRequest expenseReportRequest, List<MultipartFile> attachFiles, CustomUser customUser) {

        // 결재자 엔터티 추가
        List<Approver> approverMember = new ArrayList<>();
        for (int i = 0; i < expenseReportRequest.getApproverMember().size(); i++) {

            Employee approver = employeeRepositroy.getReferenceById(expenseReportRequest.getApproverMember().get(i));

            if (i == 0) {
                approverMember.add(Approver.of(approver, i + 1L, ACTIVATE));
            } else {
                approverMember.add(Approver.of(approver, i + 1L, WAITING));
            }
        }

        // 전달 된 파일을 서버의 지정 경로에 저장
        List<File> files = new ArrayList<>();

        for( MultipartFile attachFile : attachFiles ) {
            String replaceFileName = FileUploadUtils.saveFile(FILE_DIR, getRandomName(), attachFile);
            files.add(File.of(
                    attachFile.getOriginalFilename(),
                    "/upload/approvalFiles/",
                    replaceFileName,
                    attachFile.getOriginalFilename().substring(attachFile.getOriginalFilename().lastIndexOf("."))
            ));
        }

        Employee draftMember = employeeRepositroy.getReferenceById(customUser.getEmplyCode());

        // 전자결재 엔터티 추가
        Approval newApproval = Approval.of(
                approverMember,
                draftMember,
                expenseReportRequest.getTitle(),
                DocFormType.EXPENSE_REPORT,
                files
        );

        // 지출 결의서 상세 엔터티 추가
        List<ExpenseReportDetail> expenseReportDetails = new ArrayList<>();

        for(ExpenseReportDetailCreateRequest expenseDetailRequest : expenseReportRequest.getExpenseReportDetailCreateRequests()){
            expenseReportDetails.add(ExpenseReportDetail.of(
                    expenseDetailRequest.getItem(),
                    expenseDetailRequest.getAmount(),
                    expenseDetailRequest.getNote()
            ));
        }

        // 지출 결의서 엔터티 추가
        final ExpenseReport newExpenseReport = ExpenseReport.of(
                newApproval,
                expenseReportRequest.getTotalExpenditure(),
                expenseReportDetails
        );
        expenseReportRepository.save(newExpenseReport);
    }

    /* -------------------------------------------------- 목록 조회 -------------------------------------------------- */

    /* 2-1. 기안한 문서함 목록 전체 조회 - 페이징 */
    @Transactional(readOnly = true)
    public Page<DraftListResponse> getDraftApprovals(Integer page, CustomUser customUser) {

        Page<Approval> approvals = approvalRepository.findByDraftMemberEmplyCodeAndDocStatusNotLikeAndDocStatusNotLike(
                getPageable(page), customUser.getEmplyCode(), COLLECT, TEMP_STORAGE);

        return approvals.map(approval -> DraftListResponse.from(approval));
    }

    /* 2-2. 기안한 문서함 목록 상태별 조회, 페이징 */
    @Transactional(readOnly = true)
    public Page<DraftListResponse> getDraftApprovalsByStatus(final Integer page, String docStatus, CustomUser customUser) {

        DocStatusType docStatusType = DocStatusType.valueOf(docStatus);

        Page<Approval> approvals = approvalRepository.findByDraftMemberEmplyCodeAndDocStatus(getPageable(page), customUser.getEmplyCode(), docStatusType);

        return approvals.map(approval -> DraftListResponse.from(approval));
    }


    /* 3. 기안 회수함 목록 조회 - 페이징 */
    @Transactional(readOnly = true)
    public Page<DraftListResponse> getCollectDraftApprovals(Integer page, CustomUser customUser) {

        Page<Approval> approvals = approvalRepository.findByDraftMemberEmplyCodeAndDocStatusLike(getPageable(page), customUser.getEmplyCode(), COLLECT);

        return approvals.map(approval -> DraftListResponse.from(approval));
    }

    /* 4. 임시 저장한 목록 조회 - 페이징 */
    @Transactional(readOnly = true)
    public Page<DraftListResponse> getTempSaveDraftApprovals(Integer page, CustomUser customUser) {

        Page<Approval> approvals = approvalRepository.findByDraftMemberEmplyCodeAndDocStatusLike(getPageable(page), customUser.getEmplyCode(), TEMP_STORAGE);

        return approvals.map(approval -> DraftListResponse.from(approval));
    }

    /* 5. 받은 결재 목록 조회 - 상태별 조회, 페이징 */
    @Transactional(readOnly = true)
    public Page<ReceiveListResponse> getReceivedApprovals(Integer page, String docStatus, CustomUser customUser) {

        DocStatusType docStatusType = DocStatusType.valueOf(docStatus);

        Page<Approval> approvals
                = approvalRepository.findApprovals
                    (getPageable(page), customUser.getEmplyCode(), docStatusType);

        return approvals.map(approval -> ReceiveListResponse.from(approval));
    }


}
