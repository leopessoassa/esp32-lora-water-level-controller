package com.leopessoa.engineer.api.models.pushNotifications.repository;

import com.leopessoa.engineer.api.models.pushNotifications.NotificationPermissionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationPermissionRequestRepository extends JpaRepository<NotificationPermissionRequest, Long> {

}
