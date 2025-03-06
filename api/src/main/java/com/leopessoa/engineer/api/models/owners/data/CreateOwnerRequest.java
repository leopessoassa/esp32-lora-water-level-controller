package com.leopessoa.engineer.api.models.owners.data;

import com.leopessoa.engineer.api.util.Client;
import com.leopessoa.engineer.api.util.validators.EntityId;
import com.leopessoa.engineer.api.util.validators.Unique;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Client
public class CreateOwnerRequest {
    @NotEmpty
    @Length(max = 255)
    private String name;

    @NotEmpty
    @Length(max = 255)
    @Email
    @Unique(columnName = "email", tableName = "owner", message = "Dono com esse e-mail já existe")
    private String email;

    @NotNull
    @EntityId(columnName = "id", tableName = "state", message = "Estado a ser vinculado não existe")
    private Long stateId;

    @NotNull
    @EntityId(columnName = "id", tableName = "city", message = "Cidade a ser vinculada não existe")
    private Long cityId;
}
