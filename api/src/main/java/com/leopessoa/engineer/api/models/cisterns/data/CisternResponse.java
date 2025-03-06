package com.leopessoa.engineer.api.models.cisterns.data;

import com.leopessoa.engineer.api.models.cisterns.Cistern;
import com.leopessoa.engineer.api.models.cisterns.enums.CisternTypeEnum;
import com.leopessoa.engineer.api.models.cities.data.CityResponse;
import com.leopessoa.engineer.api.models.states.data.StateResponse;
import com.leopessoa.engineer.api.util.Client;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Client
public class CisternResponse {
    private Long id;
    private String qrCode;
    private CityResponse city;
    private StateResponse state;
    private String type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CisternResponse(Cistern entity) {
        this.id = entity.getId();
        this.qrCode = entity.getQrCode();
        this.city = new CityResponse(entity.getCity());
        this.state = new StateResponse(entity.getState());
        this.type = CisternTypeEnum.findByType(entity.getType()).getLabel();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
    }
}
