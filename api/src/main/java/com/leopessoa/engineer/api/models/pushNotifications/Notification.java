package com.leopessoa.engineer.api.models.pushNotifications;

import com.leopessoa.engineer.api.util.Client;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Getter
@Client
@NoArgsConstructor
public class Notification {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private String message;
  private String url;
  @Setter
  private boolean delivered;

  @CreatedDate
  private LocalDateTime createdAt;

  public Notification(String title, String message, String url) {
    this.title = title;
    this.message = message;
    this.url = url;
    this.delivered = false;
  }
}
