package com.leopessoa.engineer.api.models.sumaries.controller;

import com.leopessoa.engineer.api.models.sumaries.data.SumaryResponse;
import com.leopessoa.engineer.api.models.sumaries.service.SumaryService;
import com.leopessoa.engineer.api.util.Client;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Client
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sumaries")
public class SumaryController {
    private final SumaryService service;

    @GetMapping("/last-measurement/{qrCode}")
    public ResponseEntity<List<SumaryResponse>> waterlevel_lastMeasurement(@Valid @PathVariable("qrCode") String qrCode) {
        log.info("[SumaryController] Last Measurement");
        var entity = service.lastMeasurement(qrCode, 5);
        if (entity != null) {
            return ResponseEntity.ok(entity);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-month/{qrCode}")
    public ResponseEntity<List<SumaryResponse>> waterlevel_byMonth(
            @Valid @PathVariable("qrCode") String qrCode,
            @RequestParam(value = "year", defaultValue = "") String year,
            @RequestParam(value = "month", defaultValue = "") String month
    ) {
        log.info("[SumaryController] By Month");
        var entity = service.byMonthYear(qrCode, year, month);
        if (entity != null) {
            return ResponseEntity.ok(entity);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-date/{qrCode}")
    public ResponseEntity<List<SumaryResponse>> waterlevel_byDate(
            @Valid @PathVariable("qrCode") String qrCode,
            @RequestParam(value = "date", defaultValue = "") LocalDate date
    ) {
        log.info("[SumaryController] By Month");
        var entity = service.byDate(qrCode, date);
        if (entity != null) {
            return ResponseEntity.ok(entity);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/last/{qrCode}")
    public ResponseEntity<SumaryResponse > waterlevel_last(@Valid @PathVariable("qrCode") String qrCode) {
        log.info("[SumaryController] Last");
        var entity = service.last(qrCode);
        if (entity != null) {
            return ResponseEntity.ok(entity);
        }
        return ResponseEntity.noContent().build();
    }
}
