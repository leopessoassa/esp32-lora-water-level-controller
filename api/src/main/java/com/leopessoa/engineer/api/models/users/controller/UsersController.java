package com.leopessoa.engineer.api.models.users.controller;

import com.leopessoa.engineer.api.config.ApplicationProperties;
import com.leopessoa.engineer.api.models.users.enums.Role;
import com.leopessoa.engineer.api.models.users.data.*;
import com.leopessoa.engineer.api.models.users.service.UserService;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Client
public class UsersController {

    private final UserService service;
    private final ApplicationProperties applicationProperties;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PagedResponse<UserResponse>> user_list(
            @RequestParam(value = "email", defaultValue = "") String email,
            @RequestParam(value = "role", defaultValue = "USER") Role role,
            @PageableDefault(direction = Sort.Direction.ASC, sort = {"id"}) Pageable pageable) {
        log.info("[StateController] list");
        var entities = service.list(email, role, pageable);
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> user_detail(@Valid @PathVariable("id") Long id) {
        log.info("[CityController] detail");
        var entities = service.detail(id);
        return ResponseEntity.ok(entities);
    }

    /**
     * Register a new user. The user will be created with the default role USER. Verification email will
     * be sent to the user.
     */
    @PostMapping
    public ResponseEntity<UserResponse> user_create(@Valid @RequestBody CreateUserRequest request) {
        UserResponse user = service.create(request);
        return ResponseEntity.ok(user);
    }

    /**
     * Update an existing user.
     * <p>
     * Only allowed to self.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> user_update(@Valid @PathVariable("id") Long id, @Valid @RequestBody UpdateUserRequest request) {
        UserResponse user = service.update(id, request);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> user_delete(@Valid @PathVariable("id") Long id) {
        log.info("[UsersController] delete: {}", id);
        var response = service.delete(id);
        return ResponseEntity.ok(response);
    }


    /**
     * Verify the email of the user, redirect to the login page.
     */
    @GetMapping("/verify-email")
    public RedirectView verifyEmail(@RequestParam String token) {
        service.verifyEmail(token);
        return new RedirectView(applicationProperties.getLoginPageUrl());
    }

    /**
     * Request a password reset email
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest req) {
        service.forgotPassword(req.getEmail());
        return ResponseEntity.ok().build();
    }

    /**
     * Reset the password of an existing user, uses the password reset token
     * <p>
     * Only allowed with the password reset token
     */
    @PatchMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody UpdateUserPasswordRequest requestDTO) {
        service.resetPassword(requestDTO);
        return ResponseEntity.ok().build();
    }

    /**
     * Update the password of an existing user.
     * <p>
     * Only allowed with the correct old password
     */
    @PatchMapping("/password")
    public ResponseEntity<UserResponse> updatePassword(@Valid @RequestBody UpdateUserPasswordRequest requestDTO) {
        UserResponse user = service.updatePassword(requestDTO);
        return ResponseEntity.ok(user);
    }

    /**
     * Update users profile picture.
     * Receives a multipart file
     */
    @PatchMapping("/{id}/profile-picture")
    public ResponseEntity<UserResponse> updateProfilePicture(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        UserResponse user = service.updateProfilePicture(file);
        return ResponseEntity.ok(user);
    }
}
