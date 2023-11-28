package com.playwithcode.businessbridge.approval.domain.repository;

import com.playwithcode.businessbridge.approval.domain.BusinessDraft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BusinessDraftRepository extends JpaRepository<BusinessDraft, Long> {


}
