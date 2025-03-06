package com.leopessoa.engineer.api.models.sumaries.data;

import com.leopessoa.engineer.api.models.sumaries.Sumary;
import com.leopessoa.engineer.api.models.waterLevels.WaterLevel;
import com.leopessoa.engineer.api.util.Client;
import lombok.Data;

import java.time.LocalDate;

@Data
@Client
public class SumaryResponse {
    private Double average;
    private LocalDate date;
    private String time;

    public SumaryResponse(Sumary entity) {
        this.average = calculateCisternWhaterLevel(entity.getAverage());
        this.date = entity.getDate();
    }

    public SumaryResponse(WaterLevel entity) {
        this.average = calculateCisternWhaterLevel(entity.getMeasurementValue());
        var createdAt = entity.getCreatedAt();

        this.date = createdAt.toLocalDate();
        this.time = createdAt.getHour() + ":" + createdAt.getMinute() + ":" + createdAt.getSecond();
    }

    private Double calculateCisternWhaterLevel(Double measurementValue)
    {
        var cisternHeight = 450d;
        var level = ((cisternHeight - measurementValue) / cisternHeight) * 100;
        
        if (level > 100d) return 100d;
        if (level < 0d) return 0d;
        return level;
    }
}
