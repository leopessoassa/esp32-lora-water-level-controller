package com.leopessoa.engineer.api.models.sumaries;

import com.leopessoa.engineer.api.util.Client;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@Client
@Table(name = "VW_SUMARY")
public class Sumary {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "cistern_id")
    private Long cisternId;

    @Column(name = "average")
    private Double average;

    @Column(name = "date")
    private LocalDate date;
}

