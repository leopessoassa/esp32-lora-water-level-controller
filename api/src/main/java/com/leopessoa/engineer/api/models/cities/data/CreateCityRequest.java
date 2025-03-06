package com.leopessoa.engineer.api.models.cities.data;

import com.leopessoa.engineer.api.util.Client;
import com.leopessoa.engineer.api.util.validators.EntityId;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Client
public class CreateCityRequest {
    @NotEmpty
    private String name;

    @NotNull
    private Boolean isCapital;

    @NotNull
    @EntityId(columnName = "id", tableName = "state", message = "Estado a ser vinculado não existe")
    private Long stateId;
}
