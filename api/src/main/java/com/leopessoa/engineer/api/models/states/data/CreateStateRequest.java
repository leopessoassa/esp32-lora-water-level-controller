package com.leopessoa.engineer.api.models.states.data;

import com.leopessoa.engineer.api.util.Client;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Client
public class CreateStateRequest {
    @NotBlank
    @Length(max = 150)
    private String name;

    @NotBlank
    @Length(max = 2)
    private String uf;
}
