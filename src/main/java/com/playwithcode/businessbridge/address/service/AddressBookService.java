package com.playwithcode.businessbridge.address.service;

import com.playwithcode.businessbridge.address.domain.AddressBook;
import com.playwithcode.businessbridge.address.domain.repository.AddressBookRepository;
import com.playwithcode.businessbridge.address.domain.repository.DepartmentRepository;
import com.playwithcode.businessbridge.address.domain.repository.PositionRepository;
import com.playwithcode.businessbridge.address.dto.request.AddressBookUpdateRequest;
import com.playwithcode.businessbridge.address.dto.response.AddressBookResponse;
import com.playwithcode.businessbridge.common.exception.NotFoundException;
import com.playwithcode.businessbridge.common.util.FileUploadUtils;
import com.playwithcode.businessbridge.department.domain.Department;
import com.playwithcode.businessbridge.position.domain.Position;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

import static com.playwithcode.businessbridge.common.exception.type.ExceptionCode.*;

@Service
@RequiredArgsConstructor
@Transactional
public class AddressBookService {

    private final AddressBookRepository addressBookRepository;
    private final DepartmentRepository departmentRepository;
    private final PositionRepository positionRepository;

    @Value("http://localhost/emplyimgs/")
    private String IMAGE_URL;
    @Value("src/main/resources/static/emplyimgs")
    private String IMAGE_DIR;

    private Pageable getPageable(final Integer page) {
        return PageRequest.of(page - 1, 10, Sort.by("emplyCode"));
    }

    private String getRandomName() {
        return UUID.randomUUID().toString().replace("-", "");
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

    /* 4. 직원 수정(관리자) */
    public void update(final Long emplyCode, final MultipartFile emplyImg, final AddressBookUpdateRequest addressBookRequest) {

        AddressBook addressBook = addressBookRepository.findByEmplyCode(emplyCode)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_EMPLY_CODE));

        Department department = departmentRepository.findById(addressBookRequest.getDepartmentCode())
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_DEPARTMENT_CODE));

        Position position = positionRepository.findById(addressBookRequest.getPositionCode())
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_POSITION_CODE));

        /* 이미지 처리 로직 */
        if(emplyImg != null) {
            String replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, getRandomName(), emplyImg);
            FileUploadUtils.deleteFile(IMAGE_DIR, addressBook.getEmplyPhoto().replace(IMAGE_URL, ""));
            addressBook.updateEmplyPhoto(IMAGE_URL + replaceFileName);
        }

        /* Entity 정보 변경 */
        addressBook.update(
                addressBookRequest.getEmplyName(),
                addressBookRequest.getEmplyOffice(),
                addressBookRequest.getEmplyEmail(),
                department,
                position,
                addressBook.getEmplyPhoneNumber(),
                addressBook.getEmplyInternalNumber()
        );

    }

}


