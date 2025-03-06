package com.leopessoa.engineer.api.models.owners.data;

import com.leopessoa.engineer.api.models.cities.data.CityResponse;
import com.leopessoa.engineer.api.models.owners.Owner;
import com.leopessoa.engineer.api.models.states.data.StateResponse;
import com.leopessoa.engineer.api.util.Client;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Client
public class OwnerResponse {
    private Long id;
    private String name;
    private String email;
    private CityResponse city;
    private StateResponse state;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public OwnerResponse(Owner entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.city = new CityResponse(entity.getCity());
        this.state = new StateResponse(entity.getState());
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
    }
}
