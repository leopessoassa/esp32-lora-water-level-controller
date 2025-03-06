package com.leopessoa.engineer.api.models.pushNotifications.data;

import com.leopessoa.engineer.api.util.Client;
import lombok.Data;

@Data
@Client
public class SendNotificationRequest {
  private String title;
  private String message;
  private String url;
}
