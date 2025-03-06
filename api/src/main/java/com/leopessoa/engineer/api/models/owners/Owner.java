package com.leopessoa.engineer.api.models.owners;

import com.leopessoa.engineer.api.entity.AbstractEntity;
import com.leopessoa.engineer.api.models.cities.City;
import com.leopessoa.engineer.api.models.owners.data.CreateOwnerRequest;
import com.leopessoa.engineer.api.models.owners.data.UpdateOwnerRequest;
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
public class Owner extends AbstractEntity {
    @Column(nullable = false, precision = 255)
    private String name;

    @Column(nullable = false, precision = 255)
    private String email;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CITY_ID", nullable = false)
    private City city;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATE_ID", nullable = false)
    private State state;

    @CreatedDate
    private LocalDateTime createdAt;

    @CreatedDate
    private LocalDateTime updatedAt;

    public Owner(CreateOwnerRequest data) {
        this.name = data.getName();
        this.email = data.getEmail();

        var city = new City();
        city.setId(data.getCityId());
        this.city = city;

        var state = new State();
        state.setId(data.getStateId());
        this.state = state;

        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    public Owner(String name, String email, State state, City city) {
        this.name = name;
        this.email = email;
        this.city = city;
        this.state = state;
    }

    public void update(UpdateOwnerRequest data) {
        this.name = data.getName();

        var city = new City();
        city.setId(data.getCityId());
        this.city = city;

        var state = new State();
        state.setId(data.getStateId());
        this.state = state;

        this.updatedAt = LocalDateTime.now();
    }
}
