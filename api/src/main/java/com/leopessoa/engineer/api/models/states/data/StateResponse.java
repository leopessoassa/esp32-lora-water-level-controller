package com.leopessoa.engineer.api.models.states.data;

import com.leopessoa.engineer.api.models.states.State;
import com.leopessoa.engineer.api.util.Client;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Client
public class StateResponse {
    private Long id;
    private String name;
    private String uf;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public StateResponse(State entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.uf = entity.getUf();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
    }
}
