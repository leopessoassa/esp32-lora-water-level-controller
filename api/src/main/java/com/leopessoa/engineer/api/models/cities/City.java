package com.leopessoa.engineer.api.models.cities;

import com.leopessoa.engineer.api.entity.AbstractEntity;
import com.leopessoa.engineer.api.models.cities.data.CreateCityRequest;
import com.leopessoa.engineer.api.models.cities.data.UpdateCityRequest;
import com.leopessoa.engineer.api.models.states.State;
import com.leopessoa.engineer.api.util.Client;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Client
public class City extends AbstractEntity {
    @Column(precision = 150)
    private String name;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATE_ID", nullable = false)
    private State state;

    private Boolean isCapital;

    @CreatedDate
    private LocalDateTime createdAt;

    @CreatedDate
    private LocalDateTime updatedAt;

    public City(String name, Boolean isCapital, State state) {
        this.name = name;
        this.isCapital = isCapital;
        this.state = state;
    }

    public City(CreateCityRequest data) {
        this.name = data.getName();
        this.isCapital = data.getIsCapital();

        var state = new State();
        state.setId(data.getStateId());
        this.state = state;
        
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    public void update(UpdateCityRequest data) {
        this.name = data.getName();
        this.isCapital = data.getIsCapital();

        var state = new State();
        state.setId(data.getStateId());
        this.state = state;
        this.updatedAt = LocalDateTime.now();
    }
}
