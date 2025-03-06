package com.leopessoa.engineer.api.models.states;

import com.leopessoa.engineer.api.entity.AbstractEntity;
import com.leopessoa.engineer.api.models.states.data.CreateStateRequest;
import com.leopessoa.engineer.api.models.states.data.UpdateStateRequest;
import com.leopessoa.engineer.api.util.Client;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Client
public class State extends AbstractEntity {
    @Column(precision = 150)
    private String name;

    @Column(precision = 2)
    @Setter
    private String uf;

    @CreatedDate
    private LocalDateTime createdAt;

    @CreatedDate
    private LocalDateTime updatedAt;

    public State(String name, String uf) {
        this.name = name;
        this.uf = uf;
    }

    public State(CreateStateRequest data) {
        this.name = data.getName();
        this.uf = data.getUf();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    public void update(UpdateStateRequest data) {
        this.name = data.getName();
        this.uf = data.getUf();
        this.updatedAt = LocalDateTime.now();
    }
}
