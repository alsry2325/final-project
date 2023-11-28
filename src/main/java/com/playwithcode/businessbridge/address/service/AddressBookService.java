package com.playwithcode.businessbridge.address.service;

import com.playwithcode.businessbridge.address.domain.AddressBook;
import com.playwithcode.businessbridge.address.domain.repository.AddressBookRepository;
import com.playwithcode.businessbridge.address.dto.response.AddressBookResponse;
import com.playwithcode.businessbridge.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.NOT_FOUND_EMPLY_CODE;

@Service
@RequiredArgsConstructor
@Transactional
public class AddressBookService {

    private final AddressBookRepository addressBookRepository;

    private Pageable getPageable(final Integer page) {
        return PageRequest.of(page - 1, 10, Sort.by("emplyCode"));
    }

    /* 1. 주소록 사원 전체 조회 */
    @Transactional(readOnly = true)
    public Page<AddressBookResponse> getAllAddressBook(final Integer page) {
        Page<AddressBook> addressBooks = addressBookRepository.findAll(getPageable(page));
        return addressBooks.map(addressBook -> AddressBookResponse.from(addressBook));
    }

    /* 2. 주소록 부서별 조회 */
    @Transactional(readOnly = true)
    public Page<AddressBookResponse> getDepartmentAddressBook(final Integer page, final Long departmentCode) {
        Page<AddressBook> addressBooks = addressBookRepository.findByDepartmentDepartmentCode(getPageable(page), departmentCode);
        return addressBooks.map(addressBook -> AddressBookResponse.from(addressBook));
    }

    /* 3. 주소록 상세 조회 */
    @Transactional(readOnly = true)
    public AddressBookResponse getAddressBookInfo(final Long emplyCode) {

        AddressBook addressBook = addressBookRepository.findByEmplyCode(emplyCode)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_EMPLY_CODE));

        return AddressBookResponse.from(addressBook);
    }

}


