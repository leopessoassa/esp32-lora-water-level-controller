package com.leopessoa.engineer.api.models.waterLevels.data;

import com.leopessoa.engineer.api.util.Client;
import com.leopessoa.engineer.api.util.validators.EntityId;
import com.leopessoa.engineer.api.util.validators.Unique;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Client
public class CreateWaterLevelRequest {
    @NotNull
    private Double value;

    @NotNull
    private Long time;

    @NotNull
    @Length(max = 20)
    private String qrCode;

    @NotNull
    private Integer rssi;
}
