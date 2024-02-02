package com.playwithcode.businessbridge.address.presentation;

import com.playwithcode.businessbridge.address.dto.request.AddressBookUpdateRequest;
import com.playwithcode.businessbridge.address.dto.response.AddressBookResponse;
import com.playwithcode.businessbridge.address.service.AddressBookService;
import com.playwithcode.businessbridge.common.paging.Pagenation;
import com.playwithcode.businessbridge.common.paging.PagingButtonInfo;
import com.playwithcode.businessbridge.common.paging.PagingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;

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

    /* 4. 주소록 수정(관리자) */
    @PutMapping("/address-book/{emplyCode}")
    public ResponseEntity<Void> update(@PathVariable final Long emplyCode,
                                       @Valid @RequestBody AddressBookUpdateRequest addressBookRequest
                                      /* @RequestPart(required = false) final MultipartFile emplyImg*/) {

        addressBookService.update(emplyCode/*, emplyImg*/, addressBookRequest);

        return ResponseEntity.created(URI.create("/address-management/" + emplyCode)).build();
    }

    /* 5. 주소록 삭제(관리자) */
    @DeleteMapping("/address-book/{emplyCode}")
    public ResponseEntity<Void> delete(@PathVariable final Long emplyCode) {

        addressBookService.delete(emplyCode);

        return ResponseEntity.noContent().build();
    }

    /* 6. 직원 검색 - 이름 기준 */
    @GetMapping("/address-book/search")
    public ResponseEntity<PagingResponse> getEmplyName(
            @RequestParam(defaultValue = "1") final Integer page, @RequestParam final String emplyName) {

        final Page<AddressBookResponse> addressBooks = addressBookService.getEmplyName(page, emplyName);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(addressBooks);
        final PagingResponse pagingResponse = PagingResponse.of(addressBooks.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 7. 직원 검색 - 이메일 기준 */
    @GetMapping("/address-book/search2")
    public ResponseEntity<PagingResponse> getEmplyEmail(
            @RequestParam(defaultValue = "1") final Integer page, @RequestParam final String emplyEmail) {

        final Page<AddressBookResponse> addressBooks = addressBookService.getEmplyEmail(page, emplyEmail);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(addressBooks);
        final PagingResponse pagingResponse = PagingResponse.of(addressBooks.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

    /* 8. 직원 검색 - 핸드폰 기준 */
    @GetMapping("/address-book/search3")
    public ResponseEntity<PagingResponse> getEmplyPhoneNumber(
            @RequestParam(defaultValue = "1") final Integer page, @RequestParam final String emplyPhoneNumber) {

        final Page<AddressBookResponse> addressBooks = addressBookService.getEmplyPhoneNumber(page, emplyPhoneNumber);
        final PagingButtonInfo pagingButtonInfo = Pagenation.getPagingButtonInfo(addressBooks);
        final PagingResponse pagingResponse = PagingResponse.of(addressBooks.getContent(), pagingButtonInfo);

        return ResponseEntity.ok(pagingResponse);
    }

}
