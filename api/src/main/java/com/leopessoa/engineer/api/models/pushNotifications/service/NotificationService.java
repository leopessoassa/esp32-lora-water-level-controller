package com.leopessoa.engineer.api.models.pushNotifications.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationService {
  /*
  private final NotificationRepository notificationRepository;

  private final NotificationSubscriptionRepository notificationSubscriptionRepository;
  private final NotificationPermissionRequestRepository notificationPermissionRequestRepository;
  private final ApplicationProperties applicationProperties;
  private final ObjectMapper objectMapper = new ObjectMapper();
  private final PushService pushService;


  public NotificationService(NotificationSubscriptionRepository notificationSubscriptionRepository,
      NotificationPermissionRequestRepository notificationPermissionRequestRepository,
      ApplicationProperties applicationProperties,
      NotificationRepository notificationDeliveryRepository)
      throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchProviderException {
    this.notificationPermissionRequestRepository = notificationPermissionRequestRepository;
    // Register Bouncy Castle provider
    if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
      Security.addProvider(new BouncyCastleProvider());
    }

    this.notificationSubscriptionRepository = notificationSubscriptionRepository;
    this.applicationProperties = applicationProperties;
    this.pushService = new PushService()
        .setPrivateKey(applicationProperties.getVapidPrivateKey())
        .setPublicKey(applicationProperties.getVapidPublicKey())
        .setSubject(applicationProperties.getVapidSubject());
    this.notificationRepository = notificationDeliveryRepository;
  }

  public void saveSubscription(SubscriptionRequest request) {
    PushNotificationSubscription pushNotification = new PushNotificationSubscription(
        request.getEndpoint(),
        request.getP256dh(),
        request.getAuth()
    );
    notificationSubscriptionRepository.save(pushNotification);
  }

  public void sendNotification(String title, String message, String url) {
    List<PushNotificationSubscription> subscriptions = notificationSubscriptionRepository.findAll();

    for (PushNotificationSubscription subscription : subscriptions) {
      Thread.ofVirtual().start(() -> {
        try {
          Subscription sub = new Subscription(
              subscription.getEndpoint(),
              new Keys(
                  subscription.getP256dhKey(),
                  subscription.getAuthKey()
              )
          );

          Notification _notification = new Notification(title, message, url);
          _notification = notificationRepository.save(_notification);

          Map<String, String> payload = Map.of(
              "title", title,
              "message", message,
              "url", url,
              "id", _notification.getId().toString()
          );

          nl.martijndwars.webpush.Notification notification = new nl.martijndwars.webpush.Notification(
              sub,
              objectMapper.writeValueAsString(payload)
          );
          pushService.send(notification);
        } catch (Exception e) {
          log.error("Failed to send notification", e);
        }
      });
    }
  }

  public void saveDeniedRequest(NotificationPermissionRequest request) {
    notificationPermissionRequestRepository.save(request);
  }

  public void saveDelivery(Long id) {
    log.info("Received delivery notification");
    Notification notification = notificationRepository.findById(id).orElseThrow();
    notification.setDelivered(true);
    notificationRepository.save(notification);
  }*/
}
