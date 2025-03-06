package com.leopessoa.engineer.api.models.users.service;

import com.leopessoa.engineer.api.auth.SecurityUtil;
import com.leopessoa.engineer.api.models.users.PasswordResetToken;
import com.leopessoa.engineer.api.models.users.User;
import com.leopessoa.engineer.api.models.users.VerificationCode;
import com.leopessoa.engineer.api.models.users.data.CreateUserRequest;
import com.leopessoa.engineer.api.models.users.data.UpdateUserPasswordRequest;
import com.leopessoa.engineer.api.models.users.data.UpdateUserRequest;
import com.leopessoa.engineer.api.models.users.data.UserResponse;
import com.leopessoa.engineer.api.models.users.enums.Role;
import com.leopessoa.engineer.api.models.users.jobs.SendResetPasswordEmailJob;
import com.leopessoa.engineer.api.models.users.jobs.SendWelcomeEmailJob;
import com.leopessoa.engineer.api.models.users.repository.PasswordResetTokenRepository;
import com.leopessoa.engineer.api.models.users.repository.UserRepository;
import com.leopessoa.engineer.api.models.users.repository.VerificationCodeRepository;
import com.leopessoa.engineer.api.s3.UploadedFile;
import com.leopessoa.engineer.api.s3.repository.UploadedFileRepository;
import com.leopessoa.engineer.api.s3.service.FileUploadService;
import com.leopessoa.engineer.api.util.PagedResponse;
import com.leopessoa.engineer.api.util.exception.ApiException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.QueryParameterException;
import org.jobrunr.scheduling.BackgroundJobRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final VerificationCodeRepository verificationCodeRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UploadedFileRepository uploadedFileRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileUploadService fileUploadService;

    @Transactional
    public UserResponse create(@Valid CreateUserRequest request) {
        User user = new User(request);
        user = repository.save(user);
        sendVerificationEmail(user);
        return new UserResponse(user);
    }

    private void sendVerificationEmail(User user) {
        VerificationCode verificationCode = new VerificationCode(user);
        user.setVerificationCode(verificationCode);
        verificationCodeRepository.save(verificationCode);
        SendWelcomeEmailJob sendWelcomEmailJob = new SendWelcomeEmailJob(user.getId());
        BackgroundJobRequest.enqueue(sendWelcomEmailJob);
    }

    @Transactional
    public void verifyEmail(String code) {
        VerificationCode verificationCode = verificationCodeRepository.findByCode(code).orElseThrow(() -> ApiException.builder().status(400).message("Invalid token").build());
        User user = verificationCode.getUser();
        user.setVerified(true);
        repository.save(user);
        verificationCodeRepository.delete(verificationCode);
    }

    @Transactional
    public void forgotPassword(String email) {
        User user = repository.findByEmail(email).orElseThrow(() -> ApiException.builder().status(404).message("User not found").build());
        PasswordResetToken passwordResetToken = new PasswordResetToken(user);
        passwordResetTokenRepository.save(passwordResetToken);
        SendResetPasswordEmailJob sendResetPasswordEmailJob = new SendResetPasswordEmailJob(passwordResetToken.getId());
        BackgroundJobRequest.enqueue(sendResetPasswordEmailJob);
    }

    @Transactional
    public void resetPassword(UpdateUserPasswordRequest request) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(request.getPasswordResetToken()).orElseThrow(() -> ApiException.builder().status(404).message("Password reset token not found").build());

        if (passwordResetToken.isExpired()) {
            throw ApiException.builder().status(400).message("Password reset token is expired").build();
        }

        User user = passwordResetToken.getUser();
        user.updatePassword(request.getPassword());
        repository.save(user);
    }

    @Transactional
    public UserResponse update(Long id, UpdateUserRequest request) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }

        var entity = findEntity.get();
        entity.update(request);

        return new UserResponse(entity);

        /*User user = SecurityUtil.getAuthenticatedUser();
        user = repository.getReferenceById(user.getId());
        user.update(request);
        user = repository.save(user);
        return new UserResponse(user);*/
    }

    @Transactional
    public UserResponse updatePassword(UpdateUserPasswordRequest request) {
        User user = SecurityUtil.getAuthenticatedUser();
        if (user.getPassword() != null && !passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw ApiException.builder().status(400).message("Wrong password").build();
        }

        user.updatePassword(request.getPassword());
        user = repository.save(user);
        return new UserResponse(user);
    }

    @Transactional
    public Boolean delete(Long id) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }

        var entity = findEntity.get();
        repository.delete(entity);
        return true;
    }

    public UserResponse updateProfilePicture(MultipartFile file) {
        User user = SecurityUtil.getAuthenticatedUser();
        UploadedFile uploadedFile = new UploadedFile(file.getOriginalFilename(), file.getSize(), user);
        try {
            String url = fileUploadService.uploadFile(uploadedFile.buildPath("profile-picture"), file.getBytes());
            uploadedFile.onUploaded(url);
            user.setProfileImageUrl(url);
            repository.save(user);
            uploadedFileRepository.save(uploadedFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new UserResponse(user);
    }

    public PagedResponse<UserResponse> list(String email, Role role, Pageable pageable) {
        var entities = repository.findByEmailContainingAndRole(email, role, pageable);
        return new PagedResponse<>(entities.map(UserResponse::new));
    }

    public UserResponse detail(Long id) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }
        return new UserResponse(findEntity.get());
    }
}
