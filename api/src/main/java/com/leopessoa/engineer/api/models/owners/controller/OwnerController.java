package com.leopessoa.engineer.api.models.owners.controller;

import com.leopessoa.engineer.api.models.owners.data.CreateOwnerRequest;
import com.leopessoa.engineer.api.models.owners.data.OwnerResponse;
import com.leopessoa.engineer.api.models.owners.data.UpdateOwnerRequest;
import com.leopessoa.engineer.api.models.owners.service.OwnerService;
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
@RequestMapping("/api/owners")
public class OwnerController {
    private final OwnerService service;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedResponse<OwnerResponse>> owner_list(
            @RequestParam(value = "name", defaultValue = "") String name,
            @RequestParam(value = "email", defaultValue = "") String email,
            @RequestParam(value = "stateId", defaultValue = "0") Integer stateId,
            @RequestParam(value = "cityId", defaultValue = "0") Integer cityId,
            @PageableDefault(direction = Sort.Direction.ASC, sort = {"id"}) Pageable pageable) {
        log.info("[OwnerController] list");
        var entities = service.list(name, email, stateId, cityId, pageable);
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OwnerResponse> owner_detail(@Valid @PathVariable("id") Long id) {
        log.info("[OwnerController] detail");
        var entities = service.detail(id);
        return ResponseEntity.ok(entities);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OwnerResponse> owner_create(@Valid @RequestBody CreateOwnerRequest request) {
        log.info("[OwnerController] create: {}", request);
        var entity = service.create(request);
        return ResponseEntity.ok(entity);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OwnerResponse> owner_update(@Valid @PathVariable("id") Long id, @Valid @RequestBody UpdateOwnerRequest request) {
        log.info("[OwnerController] update: {}", request);
        var entity = service.update(id, request);
        return ResponseEntity.ok(entity);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> owner_delete(@Valid @PathVariable("id") Long id) {
        log.info("[OwnerController] delete: {}", id);
        var response = service.delete(id);
        return ResponseEntity.ok(response);
    }
}
