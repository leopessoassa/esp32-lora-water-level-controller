package com.leopessoa.engineer.api.models.cities.data;

import com.leopessoa.engineer.api.models.cities.City;
import com.leopessoa.engineer.api.models.states.data.StateResponse;
import com.leopessoa.engineer.api.util.Client;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Client
public class CityResponse {
    private Long id;
    private String name;
    private Boolean isCapital;
    private StateResponse state;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CityResponse(City entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.isCapital = entity.getIsCapital();
        this.state = new StateResponse(entity.getState());
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
    }
}
