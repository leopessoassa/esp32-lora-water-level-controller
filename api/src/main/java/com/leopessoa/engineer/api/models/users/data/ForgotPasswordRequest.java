package com.leopessoa.engineer.api.models.users.data;

import com.leopessoa.engineer.api.util.Client;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
@Client
public class ForgotPasswordRequest {
  @Email
  private String email;
}
