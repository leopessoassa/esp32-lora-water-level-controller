package com.leopessoa.engineer.api.models.users.data;

import com.leopessoa.engineer.api.util.Client;
import com.leopessoa.engineer.api.util.validators.Unique;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Client
public class UpdateUserRequest {
  @NotBlank
  private String firstName;
  @NotBlank
  private String lastName;
}
