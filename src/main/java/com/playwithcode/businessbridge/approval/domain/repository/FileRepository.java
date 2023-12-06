package com.playwithcode.businessbridge.approval.domain.repository;

import com.playwithcode.businessbridge.approval.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {
}
