package com.leopessoa.engineer.api.models.cisterns.data;

import com.leopessoa.engineer.api.models.cisterns.enums.CisternTypeEnum;
import com.leopessoa.engineer.api.util.Client;
import com.leopessoa.engineer.api.util.validators.EntityId;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Client
public class UpdateCisternRequest {
    @NotNull
    @EntityId(columnName = "id", tableName = "city", message = "Cidade a ser vinculado não existe")
    private Long cityId;

    @NotNull
    @EntityId(columnName = "id", tableName = "state", message = "Estado a ser vinculado não existe")
    private Long stateId;

    @Enumerated(EnumType.ORDINAL)
    private CisternTypeEnum type;
}
