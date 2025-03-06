package com.leopessoa.engineer.api.models.users.repository;

import com.leopessoa.engineer.api.models.users.PasswordResetToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

  @Query("SELECT prt FROM PasswordResetToken prt WHERE prt.token = ?1")
  Optional<PasswordResetToken> findByToken(String passwordResetToken);
}
