package com.playwithcode.businessbridge.product.service;


import com.playwithcode.businessbridge.approval.domain.File;
import com.playwithcode.businessbridge.common.util.FileUploadUtils;
import com.playwithcode.businessbridge.product.domain.Estimate;
import com.playwithcode.businessbridge.product.domain.Product;
import com.playwithcode.businessbridge.product.domain.repository.EstimateRepository;
import com.playwithcode.businessbridge.product.domain.type.EstimateType;
import com.playwithcode.businessbridge.product.dto.request.EstimateCreateRequest;
import com.playwithcode.businessbridge.product.dto.request.ProductCreateRequest;
import com.playwithcode.businessbridge.product.dto.response.CustomerProductsResponse;
import com.playwithcode.businessbridge.product.dto.response.EstimateListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.playwithcode.businessbridge.product.domain.type.EstimateType.PROGRESS;
import static com.playwithcode.businessbridge.product.domain.type.ProductStateType.SALES;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class EstimateService {

    private final EstimateRepository estimateRepository;

    @Value("${image.image-url}")
    private String FILE_URL;

    @Value("${image.image-dir}")
    private String FILE_DIR;

    private Pageable getPageable(final Integer page) {

        return PageRequest.of(page - 1, 10, Sort.by("estimateCode").descending());
    }

   //견적서 진행상황별 조회 
    @Transactional(readOnly = true)
    public Page<EstimateListResponse> getEstimateList(final Integer page, final EstimateType estiState) {

        log.info("estiState : {}", estiState);

        Page<Estimate> estimateList = estimateRepository.findByEstiState(getPageable(page), estiState);

        log.info("estimateList : {}", estimateList.getContent());

        return estimateList.map(estimate -> EstimateListResponse.from(estimate));


    }

    //거래처명 검색 조회


    @Transactional(readOnly = true)
    public Page<EstimateListResponse> getEstimateAccountName(Integer page, String accountName) {


        Page<Estimate> estimateList = estimateRepository.findByAccountAccountNameContainsAndEstiState(getPageable(page),accountName, PROGRESS);

        return estimateList.map(estimate -> EstimateListResponse.from(estimate));
    }

    //담당자 검색조회

    @Transactional(readOnly = true)
    public Page<EstimateListResponse> getEstimateAccountManager(Integer page, String accountManager) {


        Page<Estimate> estimateList = estimateRepository.findByAccountAccountManagerContainsAndEstiState(getPageable(page),accountManager, PROGRESS);

        return estimateList.map(estimate -> EstimateListResponse.from(estimate));


    }

    //견적서 등록

    private String getRandomName(){
        return UUID.randomUUID().toString().replace("-","");
    }


    public Long save(final List<MultipartFile> attachments, final EstimateCreateRequest estimateRequest ) {

        //전달 된 파일을 서버의 지정 경로에 저장
        List<File> files = new ArrayList<>();
        for(MultipartFile multipartFile : attachments) {

            String replaceFileName = FileUploadUtils.saveFile(FILE_DIR,getRandomName(),multipartFile);

            File newFile = File.of(multipartFile.getOriginalFilename(), FILE_URL + replaceFileName,
                    replaceFileName,
                    multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf("."))
            );
            files.add(newFile);
        }



        final Estimate newestimate = Estimate.of(
                estimateRequest.getAccountName(),
                estimateRequest.getAccountManager(),
                estimateRequest.getSendEmail(),
                estimateRequest.getEstimateNum(),
                estimateRequest.getAccountAddress(),
                estimateRequest.getEstiMessage(),
                estimateRequest.getProductName(),
                estimateRequest.getProductCnt(),
                estimateRequest.getProductPrice(),
                estimateRequest.getTaxCnt(),
                estimateRequest.getProvideValue(),
                estimateRequest.getProductNote()

        );



        final Estimate estimate = estimateRepository.save(newestimate);

        return estimate.getEstimateCode();



    }
}
