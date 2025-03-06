package com.leopessoa.engineer.api.models.pushNotifications.repository;

import com.leopessoa.engineer.api.models.pushNotifications.PushNotificationSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationSubscriptionRepository extends JpaRepository<PushNotificationSubscription, Long> {

}
