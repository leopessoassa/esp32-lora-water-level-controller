package com.leopessoa.engineer.api.models.cisterns.repository;

import com.leopessoa.engineer.api.models.cisterns.Cistern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CisternRepository extends JpaRepository<Cistern, Long> {
    Optional<Cistern> findByQrCode(String qrCode);
}
