package com.leopessoa.engineer.api.models.cisterns;

import com.leopessoa.engineer.api.entity.AbstractEntity;
import com.leopessoa.engineer.api.models.cisterns.data.CreateCisternRequest;
import com.leopessoa.engineer.api.models.cisterns.data.UpdateCisternRequest;
import com.leopessoa.engineer.api.models.cities.City;
import com.leopessoa.engineer.api.models.owners.Owner;
import com.leopessoa.engineer.api.models.states.State;
import com.leopessoa.engineer.api.models.users.User;
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
public class Cistern extends AbstractEntity {
    @Column(unique = true, nullable = false, precision = 20)
    private String qrCode;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CITY_ID", nullable = false)
    private City city;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATE_ID", nullable = false)
    private State state;

    @Column(precision = 45)
    private Integer type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OWNER_ID", nullable = false)
    private Owner owner;

    @CreatedDate
    private LocalDateTime createdAt;

    @CreatedDate
    private LocalDateTime updatedAt;

    public Cistern(CreateCisternRequest data) {
        this.qrCode = data.getQrCode();
        this.type = data.getType().getValue();

        var city = new City();
        city.setId(data.getCityId());
        this.city = city;

        var state = new State();
        state.setId(data.getStateId());
        this.state = state;

        var owner = new Owner();
        owner.setId(data.getOwnerId());
        this.owner = owner;

        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    public Cistern(String qrCode, City city, State state, Owner owner, Integer type) {
        this.qrCode = qrCode;
        this.city = city;
        this.state = state;
        //this.owner = owner;
        if (type != null && type > 0) {
            this.type = type;
        }
    }

    public void update(UpdateCisternRequest data) {
        var city = new City();
        city.setId(data.getCityId());
        this.city = city;

        var state = new State();
        state.setId(data.getStateId());
        this.state = state;

        this.type = data.getType().getValue();
        this.updatedAt = LocalDateTime.now();
    }
}
