package com.leopessoa.engineer.api.models.waterLevels.data;

import com.leopessoa.engineer.api.models.waterLevels.WaterLevel;
import com.leopessoa.engineer.api.util.Client;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Client
public class WaterLevelResponse {
    private Long id;
    private Long measurementTime;
    private Double measurementValue;
    private Integer rssi;
    private LocalDateTime createdAt;

    public WaterLevelResponse(WaterLevel entity) {
        this.id = entity.getId();
        this.measurementTime = entity.getMeasurementTime();
        this.measurementValue = entity.getMeasurementValue();
        this.rssi = entity.getRssi();
        this.createdAt = entity.getCreatedAt();
    }
}
