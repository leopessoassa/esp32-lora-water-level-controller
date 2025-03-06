package com.leopessoa.engineer.api.models.waterLevels.controller;

import com.leopessoa.engineer.api.models.waterLevels.data.CreateWaterLevelRequest;
import com.leopessoa.engineer.api.models.waterLevels.data.UpdateWaterLevelRequest;
import com.leopessoa.engineer.api.models.waterLevels.data.WaterLevelResponse;
import com.leopessoa.engineer.api.models.waterLevels.service.WaterLevelService;
import com.leopessoa.engineer.api.util.Client;
import com.leopessoa.engineer.api.util.PagedResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Client
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/water-levels")
public class WaterLevelController {
    private final WaterLevelService service;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedResponse<WaterLevelResponse>> waterlevel_list(
            @RequestParam(value = "qrCode", defaultValue = "") String qrCode,
            @PageableDefault(direction = Sort.Direction.ASC, sort = {"id"}) Pageable pageable) {
        log.info("[WaterLevelController] list");
        var users = service.list(qrCode, pageable);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<WaterLevelResponse> waterlevel_detail(@Valid @PathVariable("id") Long id) {
        log.info("[WaterLevelController] detail");
        var entities = service.detail(id);
        return ResponseEntity.ok(entities);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<WaterLevelResponse> waterlevel_create(@Valid @RequestBody CreateWaterLevelRequest request) throws Throwable {
        log.info("[WaterLevelController] create: {}", request);
        var entity = service.create(request);
        return ResponseEntity.ok(entity);
    }

    @GetMapping("/sensor-create")
    public ResponseEntity<WaterLevelResponse> waterlevel_sensor_create(@Valid @RequestParam("params") String params) throws Throwable {
        log.info("[WaterLevelController] sensor-create {}", params);
        var paramList = params.split(";");
        var totalParams = paramList.length;
        var request = new CreateWaterLevelRequest();
        request.setQrCode(totalParams >= 1 ? paramList[0] : null);
        request.setTime(totalParams >= 2 ? Long.valueOf(paramList[1]) : null);
        request.setValue(totalParams >= 3 ? Double.valueOf(paramList[2]) : null);
        request.setRssi(totalParams >= 4 ? Integer.valueOf(paramList[3]) : null);

        var entity = service.create(request);
        return ResponseEntity.ok(entity);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<WaterLevelResponse> waterlevel_update(@Valid @PathVariable("id") Long id, @Valid @RequestBody UpdateWaterLevelRequest request) {
        log.info("[WaterLevelController] update: {}", request);
        var entity = service.update(id, request);
        return ResponseEntity.ok(entity);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> waterlevel_delete(@Valid @PathVariable("id") Long id) {
        log.info("[WaterLevelController] delete: {}", id);
        var response = service.delete(id);
        return ResponseEntity.ok(response);
    }
}
