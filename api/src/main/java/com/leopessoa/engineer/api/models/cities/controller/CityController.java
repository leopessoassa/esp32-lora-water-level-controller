package com.leopessoa.engineer.api.models.cities.controller;

import com.leopessoa.engineer.api.models.cities.data.CityResponse;
import com.leopessoa.engineer.api.models.cities.data.CreateCityRequest;
import com.leopessoa.engineer.api.models.cities.data.UpdateCityRequest;
import com.leopessoa.engineer.api.models.cities.service.CityService;
import com.leopessoa.engineer.api.models.states.data.StateResponse;
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
@RequestMapping("/api/cities")
public class CityController {
    private final CityService service;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedResponse<CityResponse>> city_list(
            @RequestParam(value = "name", defaultValue = "") String name,
            @RequestParam(value = "uf", defaultValue = "") String uf,
            @RequestParam(value = "isCapital", defaultValue = "") Boolean isCapital,
            @PageableDefault(direction = Sort.Direction.ASC, sort = {"id"}) Pageable pageable) {
        log.info("[StateController] list");
        var entities = service.list(name, uf, isCapital, pageable);
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CityResponse> city_detail(@Valid @PathVariable("id") Long id) {
        log.info("[CityController] detail");
        var entities = service.detail(id);
        return ResponseEntity.ok(entities);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CityResponse> city_create(@Valid @RequestBody CreateCityRequest request) {
        log.info("[CityController] create: {}", request);
        var entity = service.create(request);
        return ResponseEntity.ok(entity);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CityResponse> city_update(@Valid @PathVariable("id") Long id, @Valid @RequestBody UpdateCityRequest request) {
        log.info("[CityController] update: {}", request);
        var entity = service.update(id, request);
        return ResponseEntity.ok(entity);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> city_delete(@Valid @PathVariable("id") Long id) {
        log.info("[CityController] delete: {}", id);
        var response = service.delete(id);
        return ResponseEntity.ok(response);
    }
}
