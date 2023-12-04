package com.playwithcode.businessbridge.approval.service;

import com.playwithcode.businessbridge.approval.domain.*;
import com.playwithcode.businessbridge.approval.domain.repository.*;
import com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType;
import com.playwithcode.businessbridge.approval.domain.type.DocFormType;
import com.playwithcode.businessbridge.approval.domain.type.DocStatusType;
import com.playwithcode.businessbridge.approval.dto.request.BusinessDraftCreateRequest;
import com.playwithcode.businessbridge.approval.dto.request.BusinessDraftUpdateRequest;
import com.playwithcode.businessbridge.approval.dto.request.ExpenseReportCreateRequest;
import com.playwithcode.businessbridge.approval.dto.request.ExpenseReportDetailCreateRequest;
import com.playwithcode.businessbridge.approval.dto.response.BusinessDraftResponse;
import com.playwithcode.businessbridge.approval.dto.response.DraftListResponse;
import com.playwithcode.businessbridge.approval.dto.response.ExpenseReportResponse;
import com.playwithcode.businessbridge.approval.dto.response.ReceiveListResponse;
import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.common.util.FileUploadUtils;
import com.playwithcode.businessbridge.jwt.CustomUser;
import com.playwithcode.businessbridge.member.domain.Employee;
import com.playwithcode.businessbridge.member.domain.repository.EmployeeRepositroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import java.util.stream.Collectors;

import static com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType.*;
import static com.playwithcode.businessbridge.approval.domain.type.ApprovalStatusType.WAITING;
import static com.playwithcode.businessbridge.approval.domain.type.DocFormType.BUSINESS_DRAFT;
import static com.playwithcode.businessbridge.approval.domain.type.DocFormType.EXPENSE_REPORT;
import static com.playwithcode.businessbridge.approval.domain.type.DocStatusType.*;
import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.NOT_FOUND_APPROVAL_CODE;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ApprovalService {

    private final ApprovalRepository approvalRepository;
    private final ApproverRepository approverRepository;
    private final BusinessDraftRepository businessDraftRepository;
    private final ExpenseReportRepository expenseReportRepository;
    private final EmployeeRepositroy employeeRepositroy;
    private final FileRepository fileRepository;

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
        for(int i = 0; i < businessDraftRequest.getApprover().size(); i++) {

            Employee approver = employeeRepositroy.getReferenceById(businessDraftRequest.getApprover().get(i));

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
                    FILE_URL + replaceFileName,
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
                BUSINESS_DRAFT,
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
                    FILE_URL + replaceFileName,
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

    /* 2-1. 받은 결재 목록 조회 - 상태 전체 조회, 페이징 */
    @Transactional(readOnly = true)
    public Page<ReceiveListResponse> getReceivedApprovals(Integer page, CustomUser customUser) {

        Page<Approval> approvals = approvalRepository.findApprovals(getPageable(page), customUser.getEmplyCode());

        return approvals.map(approval -> ReceiveListResponse.from(approval));
    }

    /* 2-2. 받은 결재 목록 조회 - 상태별 조회, 페이징 */
    @Transactional(readOnly = true)
    public Page<ReceiveListResponse> getReceivedApprovalsByStatus(Integer page, String docStatus, CustomUser customUser) {

        DocStatusType docStatusType = DocStatusType.valueOf(docStatus);

        Page<Approval> approvals
                = approvalRepository.findApprovals
                (getPageable(page), customUser.getEmplyCode(), docStatusType);

        return approvals.map(approval -> ReceiveListResponse.from(approval));
    }

    /* 3. 받을 결재 목록 조회 */
    @Transactional(readOnly = true)
    public Page<ReceiveListResponse> getUpcomingApprovals(Integer page, CustomUser customUser) {

        Page<Approval> approvals = approvalRepository.findApprovalsByApproverMember(getPageable(page), customUser.getEmplyCode());

        return approvals.map(approval -> ReceiveListResponse.from(approval));
    }

    /* 4-1. 기안한 문서함 목록 전체 조회 - 페이징 */
    @Transactional(readOnly = true)
    public Page<DraftListResponse> getDraftApprovals(Integer page, CustomUser customUser) {

        Page<Approval> approvals = approvalRepository.findByDraftMemberEmplyCodeAndDocStatusNotLikeAndDocStatusNotLike(
                getPageable(page), customUser.getEmplyCode(), COLLECT, TEMP_STORAGE);

        return approvals.map(approval -> DraftListResponse.from(approval));
    }

    /* 4-2. 기안한 문서함 목록 상태별 조회, 페이징 */
    @Transactional(readOnly = true)
    public Page<DraftListResponse> getDraftApprovalsByStatus(final Integer page, String docStatus, CustomUser customUser) {

        DocStatusType docStatusType = DocStatusType.valueOf(docStatus);

        Page<Approval> approvals = approvalRepository.findByDraftMemberEmplyCodeAndDocStatus(getPageable(page), customUser.getEmplyCode(), docStatusType);

        return approvals.map(approval -> DraftListResponse.from(approval));
    }


    /* 5. 기안 회수함 목록 조회 - 페이징 */
    @Transactional(readOnly = true)
    public Page<DraftListResponse> getCollectDraftApprovals(Integer page, CustomUser customUser) {

        Page<Approval> approvals = approvalRepository.findByDraftMemberEmplyCodeAndDocStatusLike(getPageable(page), customUser.getEmplyCode(), COLLECT);

        return approvals.map(approval -> DraftListResponse.from(approval));
    }

    /* 6. 임시 저장한 목록 조회 - 페이징 */
    @Transactional(readOnly = true)
    public Page<DraftListResponse> getTempSaveDraftApprovals(Integer page, CustomUser customUser) {

        Page<Approval> approvals = approvalRepository.findByDraftMemberEmplyCodeAndDocStatusLike(getPageable(page), customUser.getEmplyCode(), TEMP_STORAGE);

        return approvals.map(approval -> DraftListResponse.from(approval));
    }


    /* 7-1. 결재한 문서함 - 전체 조회, 페이징 */
    public Page<ReceiveListResponse> getApproveApprovals(Integer page, CustomUser customUser) {

        Page<Approval> approvals = approvalRepository.findByApproverMember(getPageable(page), customUser.getEmplyCode());

        return approvals.map(approval -> ReceiveListResponse.from(approval));
    }


    /* 7-2. 결재한 문서함 - 상태별 조회, 페이징 */
    public Page<ReceiveListResponse> getApproveApprovalsByStatus(Integer page, CustomUser customUser, String docStatus) {

        DocStatusType docStatusType = DocStatusType.valueOf(docStatus);

        Page<Approval> approvals = approvalRepository.findByApproverMember(getPageable(page), customUser.getEmplyCode(), docStatusType);

        return approvals.map(approval -> ReceiveListResponse.from(approval));
    }

    /* -------------------------------------------------- 상세 조회 -------------------------------------------------- */

    /* 8. 업무기안서 상세 조회 */
    @Transactional(readOnly = true)
    public BusinessDraftResponse getBusinessDraft(final Long approvalCode) {

        BusinessDraft businessDraft = businessDraftRepository.findByApprovalApprovalCodeAndApprovalDocFormLike(approvalCode, BUSINESS_DRAFT)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_APPROVAL_CODE));

        return BusinessDraftResponse.from(businessDraft);
    }

    /* 9. 지출결의서 상세 조회 */
    public ExpenseReportResponse getExpenseReport(Long approvalCode) {

        ExpenseReport expenseReport = expenseReportRepository.findByApprovalApprovalCodeAndApprovalDocFormLike(approvalCode, EXPENSE_REPORT)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_APPROVAL_CODE));

        return ExpenseReportResponse.from(expenseReport);
    }

    /* -------------------------------------------------- 결재 수정 -------------------------------------------------- */

    /* 10. 업무기안서 수정 */
    public void update(Long approvalCode, List<MultipartFile> attachFiles, BusinessDraftUpdateRequest businessDraftUpdate) {

        // 1. 업무기안서 조회
        BusinessDraft businessDraft = businessDraftRepository.findByApprovalApprovalCodeAndApprovalDocFormLike(approvalCode, BUSINESS_DRAFT)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_APPROVAL_CODE));

        // 2. 첨부파일 수정
        List<File> files = new ArrayList<>();

        if(attachFiles != null){
            for (MultipartFile attachFile : attachFiles) {
//                // 새로 입력 된 파일 저장
//                String replaceFileName = FileUploadUtils.saveFile(FILE_DIR, getRandomName(), attachFile);
//                log.info("replaceFileName : {}", replaceFileName);
//                // 기존 파일 삭제
//                List<String> fileNames = businessDraft.getApproval().getFile()
//                        .stream().map(file -> file.getPathName().replace(FILE_URL, ""))
//                        .collect(Collectors.toList());
//                log.info("fileNames : {}", fileNames);
//
//                for (String fileName : fileNames) {
//                    log.info("fileName : {}", fileName);
//                    FileUploadUtils.deleteFile(FILE_DIR, fileName);
//                }
//                // 파일 엔티티 정보 변경
//                files = businessDraft.getApproval().getFile().stream()
//                        .map(file -> {file.updateFileUrl(FILE_URL + replaceFileName);
//                        return file;
//                        }).collect(Collectors.toList());

                // 기존 파일 엔티티 삭제
                fileRepository.deleteAll(businessDraft.getApproval().getFile());

                String replaceFileName = FileUploadUtils.saveFile(FILE_DIR, getRandomName(), attachFile);
                files.add(File.of(
                        attachFile.getOriginalFilename(),
                        FILE_URL + replaceFileName,
                        replaceFileName,
                        attachFile.getOriginalFilename().substring(attachFile.getOriginalFilename().lastIndexOf("."))
                        ));
                }
            }

        // 3. 엔티티 정보 변경
        // 결재자
        // Long타입으로 넘어온 결재자들의 코드 리스트를 가지고 결재자 엔티티를 업데이트 => 삭제 후 등록
        List<Approver> approverMember = new ArrayList<>();
        // 이전 결재자 엔터티 삭제
        approverRepository.deleteAll(businessDraft.getApproval().getApproverMember());

        // 결재자 엔터티 추가
        for(int i = 0; i < businessDraftUpdate.getApprovers().size(); i++) {

            Employee approver = employeeRepositroy.getReferenceById(businessDraftUpdate.getApprovers().get(i));

            if(i == 0) {
                approverMember.add(Approver.of(approver, i+1L, ACTIVATE));
                // 생성하는 DTO에서 Long타입으로 정보를 받아오는데 저장되는 of메소드에서 approver의 타입은 Employee임
            } else {
                approverMember.add(Approver.of(approver, i+1L, WAITING));
            }
        }

        // 전자결재
        businessDraft.getApproval().update(
                approverMember,
                businessDraftUpdate.getTitle(),
//                businessDraftUpdate.getDocStatus(),
                files
        );

        // 업무기안서
        businessDraft.update(businessDraftUpdate.getBusinessDraftContent());
    }
}
