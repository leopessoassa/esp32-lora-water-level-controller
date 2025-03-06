package com.leopessoa.engineer.api.models.users;

import com.leopessoa.engineer.api.entity.AbstractEntity;
import com.leopessoa.engineer.api.util.Client;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

@Entity
@Getter
@NoArgsConstructor
@Client
public class VerificationCode extends AbstractEntity {

  private String code;
  @Setter
  private boolean emailSent = false;
  @OneToOne
  private User user;

  public VerificationCode(User user) {
    this.user = user;
    this.code = RandomStringUtils.random(6, false, true);
  }
}
