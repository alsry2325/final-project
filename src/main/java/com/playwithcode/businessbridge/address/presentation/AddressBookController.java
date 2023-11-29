package com.playwithcode.businessbridge.address.presentation;

import com.playwithcode.businessbridge.address.dto.response.AddressBookResponse;
import com.playwithcode.businessbridge.address.service.AddressBookService;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    /* 2. 주소록 부서별 조회 */
    @GetMapping("/address-book/department/{departmentCode}")
    public ResponseEntity<PagingResponse> getDepartmentAddressBook(
            @RequestParam(defaultValue = "1") final Integer page, @PathVariable final Long departmentCode) {

        final Page<AddressBookResponse> addressBooks = addressBookService.getDepartmentAddressBook(page, departmentCode);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(addressBooks);
        final PagingResponse pagingResponse = PagingResponse.of(addressBooks.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /*3. 주소록 상세조회 */
    @GetMapping("/address-book/{emplyCode}")
    public ResponseEntity<AddressBookResponse> getAddressBookInfo(@PathVariable final Long emplyCode) {

        final AddressBookResponse addressBookResponse = addressBookService.getAddressBookInfo(emplyCode);

        return ResponseEntity.ok(addressBookResponse);
    }
}
