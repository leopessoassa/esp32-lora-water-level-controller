package com.leopessoa.engineer.api.models.cisterns.data;

import com.leopessoa.engineer.api.models.cisterns.enums.CisternTypeEnum;
import com.leopessoa.engineer.api.util.Client;
import com.leopessoa.engineer.api.util.validators.EntityId;
import com.leopessoa.engineer.api.util.validators.Unique;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Client
public class CreateCisternRequest {
    @NotEmpty
    @Length(max = 20)
    @Unique(columnName = "qr_code", tableName = "cistern", message = "Cisterna com esse QR Code já existe")
    private String qrCode;

    @NotNull
    @EntityId(columnName = "id", tableName = "city", message = "Cidade a ser vinculado não existe")
    private Long cityId;

    @NotNull
    @EntityId(columnName = "id", tableName = "state", message = "Estado a ser vinculado não existe")
    private Long stateId;

    @NotNull
    @Enumerated(EnumType.ORDINAL)
    private CisternTypeEnum type;

    @NotNull
    @EntityId(columnName = "id", tableName = "owner", message = "Dono a ser vinculado não existe")
    private Long ownerId;
}
