package com.leopessoa.engineer.api.models.pushNotifications.data;

import com.leopessoa.engineer.api.util.Client;
import lombok.Data;

@Data
@Client
public class SubscriptionRequest {
  private String endpoint;
  private String p256dh;
  private String auth;
}
