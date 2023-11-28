package com.playwithcode.businessbridge.address.domain.repository;

import com.playwithcode.businessbridge.address.domain.AddressBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressBookRepository extends JpaRepository<AddressBook, Long> {
    Page<AddressBook> findAll(Pageable pageable);
}

