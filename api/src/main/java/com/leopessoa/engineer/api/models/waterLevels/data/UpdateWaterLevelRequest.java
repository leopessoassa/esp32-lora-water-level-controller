package com.leopessoa.engineer.api.models.waterLevels.data;

import com.leopessoa.engineer.api.util.Client;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Client
public class UpdateWaterLevelRequest {
    @NotNull
    private Long measurementTime;

    @NotNull
    private Double measurementValue;

    @NotNull
    private Integer rssi;
}
