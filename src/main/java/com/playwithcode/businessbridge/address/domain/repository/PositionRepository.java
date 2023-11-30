package com.playwithcode.businessbridge.address.domain.repository;

import com.playwithcode.businessbridge.position.domain.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {
}
