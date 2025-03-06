package com.leopessoa.engineer.api.models.states.controller;

import com.leopessoa.engineer.api.models.states.data.CreateStateRequest;
import com.leopessoa.engineer.api.models.states.data.StateResponse;
import com.leopessoa.engineer.api.models.states.data.UpdateStateRequest;
import com.leopessoa.engineer.api.models.states.service.StateService;
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
@RequestMapping("/api/states")
public class StateController {
    private final StateService service;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedResponse<StateResponse>> state_list(
            @RequestParam(value = "name", defaultValue = "") String name,
            @RequestParam(value = "uf", defaultValue = "") String uf,
            @PageableDefault(direction = Sort.Direction.ASC, sort = {"id"}) Pageable pageable) {
        log.info("[StateController] list");
        var entities = service.list(name, uf, pageable);
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StateResponse> state_detail(@Valid @PathVariable("id") Long id) {
        log.info("[StateController] detail");
        var entities = service.detail(id);
        return ResponseEntity.ok(entities);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StateResponse> state_create(@Valid @RequestBody CreateStateRequest request) {
        log.info("[StateController] create: {}", request);
        var entity = service.create(request);
        return ResponseEntity.ok(entity);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StateResponse> state_update(@Valid @PathVariable("id") Long id, @Valid @RequestBody UpdateStateRequest request) {
        log.info("[StateController] update: {}", request);
        var entity = service.update(id, request);
        return ResponseEntity.ok(entity);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> state_delete(@Valid @PathVariable("id") Long id) {
        //log.info("[StateController] delete: {}", id);
        //var response = service.delete(id);
        //return ResponseEntity.ok(response);
        return ResponseEntity.ok(true);
    }
}
