package com.playwithcode.businessbridge.account.presentation;
import com.playwithcode.businessbridge.account.dto.request.AccountCreateRequest;
import com.playwithcode.businessbridge.account.dto.request.AccountUpdateRequest;
import com.playwithcode.businessbridge.account.dto.response.AccountDetailesponse;
import com.playwithcode.businessbridge.account.dto.response.AccountListResponse;
import com.playwithcode.businessbridge.account.service.AccountService;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import com.playwithcode.businessbridge.jwt.CustomUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.net.URI;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    /* 1. 거래처 목록 조회 - 검색조건, 페이징 */
    @GetMapping("/account/accountList/{departmentCode}")
    public ResponseEntity<PagingResponse> getFindAll(
            @RequestParam(defaultValue = "1") final Integer page
            , @RequestParam(required = false) String schType
            , @RequestParam(required = false) String schText
            , @PathVariable final Integer departmentCode
    ) {

        log.info("METHOD GET /api/v1/account/accountList/{departmentCode}",departmentCode);
        final Page<AccountListResponse> accountList = accountService.getFindAll(page, departmentCode, schType, schText);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(accountList);
        final PagingResponse pagingResponse = PagingResponse.of(accountList.getContent(), pagingButtonInfo);
        return ResponseEntity.ok(pagingResponse);
    }

    /* 2. 거래처 상세 조회 - accountCode로 거래처 1개 조회*/
    @GetMapping("/account/{accountCode}")
    public ResponseEntity<AccountDetailesponse> getAccountDetail(@PathVariable final Long accountCode) {
    	log.info("METHOD GET /api/v1/account/{}",accountCode);
    	final AccountDetailesponse accountDetailesponse = accountService.getAccountDetail(accountCode);
    	return ResponseEntity.ok(accountDetailesponse);
    }

  	/* 3. 거래처등록 */
    @PostMapping("/account")
    public ResponseEntity<Map<String, Object>> save(
    		@RequestBody @Valid final AccountCreateRequest accountCreateRequest
    		, @AuthenticationPrincipal final CustomUser customUser
    	) {
    	log.info("METHOD POST /api/v1/account");
    	log.info("accountCreateRequest >>>>>>>>>>>>>>>>>>>>>> {}",accountCreateRequest.toString());
    	final Long accountCode = accountService.save(accountCreateRequest, customUser);
    	return ResponseEntity.created(URI.create("/account-management/" + accountCode)).build();	//추후 주석해제
    }

    /* 4.거래처수정 */
    @PutMapping("/account/{accountCode}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable final Long accountCode, @RequestBody @Valid final AccountUpdateRequest accountUpdateRequest) {
    	log.info("METHOD PUT /api/v1/account/{}",accountCode);
    	log.info("accountUpdateRequest >>>>>>>>>>>>>>>>>>>>>> {}",accountUpdateRequest.toString());
    	accountService.update(accountCode, accountUpdateRequest);
    	return ResponseEntity.created(URI.create("/account-management/" + accountCode)).build(); //추후 주석해제
    }
    
    /* 5. 거래처삭제 */
    @DeleteMapping("/account/{accountCode}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable final Long accountCode) {
    	log.info("METHOD DELETE /api/v1/account/{}",accountCode);
    	accountService.delete(accountCode);
    	return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    
}