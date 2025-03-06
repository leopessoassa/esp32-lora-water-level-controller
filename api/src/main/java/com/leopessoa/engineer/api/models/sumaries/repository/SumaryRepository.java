package com.leopessoa.engineer.api.models.sumaries.repository;

import com.leopessoa.engineer.api.models.sumaries.Sumary;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SumaryRepository extends ViewRepository<Sumary, Long> {
    @Query(value = "SELECT id, cistern_id, average, date FROM vw_sumary WHERE cistern_id = :idCistern ORDER BY date DESC LIMIT :limit", nativeQuery = true)
    List<Sumary> findAllSumaryByLastMeasurementLimit(@Param("idCistern") Long idCistern, @Param("limit") Integer limit);

    @Query(value = "SELECT id, cistern_id, average, date FROM vw_sumary WHERE cistern_id = :idCistern AND date like :date ORDER BY date DESC", nativeQuery = true)
    List<Sumary> findAllSumaryContainsDate(@Param("idCistern") Long idCistern, @Param("date") String date);
}
