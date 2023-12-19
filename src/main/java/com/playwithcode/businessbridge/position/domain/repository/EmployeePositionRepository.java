package com.playwithcode.businessbridge.position.domain.repository;

import com.playwithcode.businessbridge.position.domain.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeePositionRepository extends JpaRepository<Position, Long> {
}
