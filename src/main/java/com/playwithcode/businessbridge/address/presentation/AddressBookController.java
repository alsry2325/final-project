package com.playwithcode.businessbridge.address.presentation;

import com.playwithcode.businessbridge.address.dto.response.AddressBookResponse;
import com.playwithcode.businessbridge.address.service.AddressBookService;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AddressBookController {

    private final AddressBookService addressBookService;

    /* 1. 주소록 사원 전체 조회 */
    @GetMapping("/address-book")
    public ResponseEntity<PagingResponse> getAllAddressBook(@RequestParam(defaultValue = "1") final Integer page) {

        final Page<AddressBookResponse> addressBooks = addressBookService.getAllAddressBook(page);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(addressBooks);
        final PagingResponse pagingResponse = PagingResponse.of(addressBooks.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }
}
