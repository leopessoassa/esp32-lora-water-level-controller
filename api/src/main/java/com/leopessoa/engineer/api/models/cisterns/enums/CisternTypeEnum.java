package com.leopessoa.engineer.api.models.cisterns.enums;

import lombok.Getter;

public enum CisternTypeEnum {
    ALVENARIA(1, "Alvenaria"),
    POLIPROPILENO(2, "Polipropileno"),
    PEDRA(3, "Pedra");

    @Getter
    private final Integer value;
    @Getter
    private final String label;

    CisternTypeEnum(Integer value, String label) {
        this.value = value;
        this.label = label;
    }

    public static CisternTypeEnum findByType(Integer type) {
        CisternTypeEnum result = null;
        for (CisternTypeEnum cisternType : values()) {
            if (cisternType.value.equals(type)) {
                result = cisternType;
                break;
            }
        }
        return result;
    }
}
