package com.leopessoa.engineer.api.models.waterLevels;

import com.leopessoa.engineer.api.entity.AbstractEntity;
import com.leopessoa.engineer.api.models.cisterns.Cistern;
import com.leopessoa.engineer.api.models.waterLevels.data.CreateWaterLevelRequest;
import com.leopessoa.engineer.api.models.waterLevels.data.UpdateWaterLevelRequest;
import com.leopessoa.engineer.api.util.Client;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Client
public class WaterLevel extends AbstractEntity {
    private Long measurementTime;

    private Double measurementValue;

    private Integer rssi;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CISTERN_ID", nullable = false)
    private Cistern cistern;

    @CreatedDate
    private LocalDateTime createdAt;

    @CreatedDate
    private LocalDateTime updatedAt;

    public WaterLevel(CreateWaterLevelRequest data) {
        this.measurementValue = data.getValue();
        this.measurementTime = data.getTime();
        this.rssi = data.getRssi();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    public void update(UpdateWaterLevelRequest data) {
        this.measurementTime = data.getMeasurementTime();
        this.measurementValue = data.getMeasurementValue();
        this.rssi = data.getRssi();
        this.updatedAt = LocalDateTime.now();
    }
}
