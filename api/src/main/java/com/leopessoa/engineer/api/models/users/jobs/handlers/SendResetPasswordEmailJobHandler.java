package com.leopessoa.engineer.api.models.users.jobs.handlers;

import com.leopessoa.engineer.api.config.ApplicationProperties;
import com.leopessoa.engineer.api.email.EmailService;
import com.leopessoa.engineer.api.models.users.PasswordResetToken;
import com.leopessoa.engineer.api.models.users.User;
import com.leopessoa.engineer.api.models.users.jobs.SendResetPasswordEmailJob;
import com.leopessoa.engineer.api.models.users.repository.PasswordResetTokenRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.jobrunr.jobs.lambdas.JobRequestHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Component
@RequiredArgsConstructor
public class SendResetPasswordEmailJobHandler implements JobRequestHandler<SendResetPasswordEmailJob> {

  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final EmailService emailService;
  private final ApplicationProperties applicationProperties;
  private final SpringTemplateEngine templateEngine;

  @Override
  @Transactional
  public void run(SendResetPasswordEmailJob sendResetPasswordEmailJob) throws Exception {
    PasswordResetToken resetToken = passwordResetTokenRepository.findById(sendResetPasswordEmailJob.getTokenId())
        .orElseThrow(() -> new IllegalArgumentException("Token not found"));
    if (!resetToken.isEmailSent()) {
      sendResetPasswordEmail(resetToken.getUser(), resetToken);
    }
  }

  private void sendResetPasswordEmail(User user, PasswordResetToken token) {
    String link = applicationProperties.getBaseUrl() + "/auth/reset-password?token=" + token.getToken();
    Context thymeleafContext = new Context();
    thymeleafContext.setVariable("user", user);
    thymeleafContext.setVariable("link", link);
    String htmlBody = templateEngine.process("password-reset", thymeleafContext);
    emailService.sendHtmlMessage(List.of(user.getEmail()), "Password reset requested", htmlBody);
    token.onEmailSent();
    passwordResetTokenRepository.save(token);
  }
}
