package com.leopessoa.engineer.api.models.waterLevels.repository;

import com.leopessoa.engineer.api.models.cisterns.Cistern;
import com.leopessoa.engineer.api.models.waterLevels.WaterLevel;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WaterLevelRepository extends JpaRepository<WaterLevel, Long> {
    List<WaterLevel> findAllByCisternOrderByCreatedAtDesc(Cistern cistern, Limit limit);

    @Query(value = "SELECT * FROM water_level WHERE cistern_id = :idCistern AND created_at like :date ORDER BY created_at DESC", nativeQuery = true)
    List<WaterLevel> findAllByCreatedAtContains(@Param("idCistern") Long idCistern, @Param("date") String date);
}
