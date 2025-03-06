package com.leopessoa.engineer.api.models.pushNotifications.repository;

import com.leopessoa.engineer.api.models.pushNotifications.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
