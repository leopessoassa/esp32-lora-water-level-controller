package com.leopessoa.engineer.api.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public final class DateUtil {
    private DateUtil() {
    }

    public static LocalDateTime timestampToLocalDateTime(final long timestamp) {
        Instant instant = Instant.ofEpochMilli(timestamp);
        return LocalDateTime.ofInstant(instant, ZoneId.of("America/Sao_Paulo"));
    }
}
