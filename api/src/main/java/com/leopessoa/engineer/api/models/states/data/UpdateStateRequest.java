package com.leopessoa.engineer.api.models.states.data;

import com.leopessoa.engineer.api.util.Client;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Client
public class UpdateStateRequest {
    @NotEmpty
    @Length(max = 150)
    private String name;

    @NotEmpty
    @Length(max = 2)
    private String uf;
}
