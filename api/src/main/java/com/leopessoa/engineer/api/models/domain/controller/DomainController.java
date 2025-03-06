package com.leopessoa.engineer.api.models.domain.controller;

import com.leopessoa.engineer.api.util.Client;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Client
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class DomainController {
    @GetMapping
    public ResponseEntity<?> base() {
        return ResponseEntity.ok().build();
    }
}
