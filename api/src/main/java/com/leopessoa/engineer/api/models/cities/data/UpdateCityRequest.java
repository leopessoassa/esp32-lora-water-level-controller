package com.leopessoa.engineer.api.models.cities.data;

import com.leopessoa.engineer.api.util.Client;
import com.leopessoa.engineer.api.util.validators.EntityId;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Client
public class UpdateCityRequest {
    @NotEmpty
    @Length(max = 150)
    private String name;

    @NotNull
    private Boolean isCapital;

    @NotNull
    @EntityId(columnName = "id", tableName = "state", message = "Estado não existe")
    private Long stateId;
}
