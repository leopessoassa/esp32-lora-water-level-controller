package com.leopessoa.engineer.api.models.owners.data;

import com.leopessoa.engineer.api.util.Client;
import com.leopessoa.engineer.api.util.validators.EntityId;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Client
public class UpdateOwnerRequest {
    @NotEmpty
    @Length(max = 255)
    private String name;

    @NotNull
    @EntityId(columnName = "id", tableName = "state", message = "Estado a ser vinculado não existe")
    private Long stateId;

    @NotNull
    @EntityId(columnName = "id", tableName = "city", message = "Cidade a ser vinculada não existe")
    private Long cityId;
}
