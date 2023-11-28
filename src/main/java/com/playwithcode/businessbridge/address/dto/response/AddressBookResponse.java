package com.playwithcode.businessbridge.address.dto.response;

import com.playwithcode.businessbridge.address.domain.AddressBook;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PRIVATE;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class AddressBookResponse {

    private final Long emplyCode;
    private final String emplyId;
    private final String emplyName;
    private final String emplyPhoneNumber;
    private final String emplyEmail;
    private final String emplyInternalNumber;
    private final String departmentName;
    private final String positionName;
    private final LocalDateTime createdAt;
    private final LocalDateTime retirementDate;

    public static AddressBookResponse from(final AddressBook addressBook){
        return new AddressBookResponse(
                addressBook.getEmplyCode(),
                addressBook.getEmplyId(),
                addressBook.getEmplyName(),
                addressBook.getEmplyPhoneNumber(),
                addressBook.getEmplyEmail(),
                addressBook.getEmplyInternalNumber(),
                addressBook.getDepartment().getDepartmentName(),
                addressBook.getPosition().getPositionName(),
                addressBook.getCreatedAt(),
                addressBook.getRetirementDate()
        );
    }
}
