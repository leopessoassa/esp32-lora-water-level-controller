package com.leopessoa.engineer.api.models.sumaries.service;

import com.leopessoa.engineer.api.models.cisterns.repository.CisternRepository;
import com.leopessoa.engineer.api.models.sumaries.data.SumaryResponse;
import com.leopessoa.engineer.api.models.sumaries.repository.SumaryRepository;
import com.leopessoa.engineer.api.models.waterLevels.repository.WaterLevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Limit;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SumaryService {
    private final SumaryRepository repository;
    private final CisternRepository cisternRepository;
    private final WaterLevelRepository waterLevelRepository;

    public List<SumaryResponse> lastMeasurement(String qrCode, Integer limit) {
        var cister = cisternRepository.findByQrCode(qrCode);
        if (cister.isPresent()) {
            var entities = repository.findAllSumaryByLastMeasurementLimit(cister.get().getId(), limit);
            return entities.stream().map(SumaryResponse::new).collect(Collectors.toList());
        }
        return List.of();
    }

    public List<SumaryResponse> byMonthYear(String qrCode, String year, String month) {
        var cister = cisternRepository.findByQrCode(qrCode);
        if (cister.isPresent()) {
            var entities = repository.findAllSumaryContainsDate(cister.get().getId(), year+"-"+month+"%");
            return entities.stream().map(SumaryResponse::new).collect(Collectors.toList());
        }
        return List.of();
    }

    public List<SumaryResponse> byDate(String qrCode, LocalDate date) {
        var cister = cisternRepository.findByQrCode(qrCode);
        if (cister.isPresent()) {
            System.out.println(date.toString()+"%");
            var entities = waterLevelRepository.findAllByCreatedAtContains(cister.get().getId(), date.toString()+"%");
            return entities.stream().map(SumaryResponse::new).collect(Collectors.toList());
        }
        return List.of();
    }

    public SumaryResponse last(String qrCode) {
        var cister = cisternRepository.findByQrCode(qrCode);
        if (cister.isPresent()) {
            var entities = waterLevelRepository.findAllByCisternOrderByCreatedAtDesc(cister.get(), Limit.of(1));
            return entities.size() > 0 ? new SumaryResponse(entities.get(0)) : null;
        }
        return null;
    }
}
