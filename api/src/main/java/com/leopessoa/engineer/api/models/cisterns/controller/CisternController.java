package com.leopessoa.engineer.api.models.cisterns.controller;

import com.leopessoa.engineer.api.models.cisterns.data.CisternResponse;
import com.leopessoa.engineer.api.models.cisterns.data.CreateCisternRequest;
import com.leopessoa.engineer.api.models.cisterns.data.UpdateCisternRequest;
import com.leopessoa.engineer.api.models.cisterns.service.CisternService;
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

import java.util.List;

@Slf4j
@Client
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cisterns")
public class CisternController {
    private final CisternService service;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedResponse<CisternResponse>> cistern_list(
            @RequestParam(value = "qrCode", defaultValue = "") String qrCode,
            @RequestParam(value = "cityId", defaultValue = "0") Integer cityId,
            @RequestParam(value = "stateId", defaultValue = "0") Integer stateId,
            @RequestParam(value = "userId", defaultValue = "0") Integer userId,
            @RequestParam(value = "type", defaultValue = "0") Integer type,
            @PageableDefault(direction = Sort.Direction.ASC, sort = {"id"}) Pageable pageable) {
        log.info("[CisternController] list");
        var entities = service.list(qrCode, cityId, stateId, userId, type, pageable);
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CisternResponse> cistern_detail(@Valid @PathVariable("id") Long id) {
        log.info("[CisternController] detail");
        var entities = service.detail(id);
        return ResponseEntity.ok(entities);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CisternResponse> cistern_create(@Valid @RequestBody CreateCisternRequest request) {
        log.info("[CisternController] create: {}", request);
        var entity = service.create(request);
        return ResponseEntity.ok(entity);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CisternResponse> cistern_update(@Valid @PathVariable("id") Long id, @Valid @RequestBody UpdateCisternRequest request) {
        log.info("[CisternController] update: {}", request);
        var entity = service.update(id, request);
        return ResponseEntity.ok(entity);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> cistern_delete(@Valid @PathVariable("id") Long id) {
        log.info("[CisternController] delete: {}", id);
        var response = service.delete(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/find/{qrCode}")
    public ResponseEntity<CisternResponse> cistern_find(@Valid @PathVariable("qrCode") String qrCode) {
        log.info("[CisternController] find");
        var entity = service.find(qrCode);
        if (entity != null) {
            return ResponseEntity.ok(entity);
        }
        return ResponseEntity.noContent().build();
    }
}
