package com.leopessoa.engineer.api.util.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Component;

@Component
public class EntityIdValidator implements ConstraintValidator<EntityId, Long> {

    private final JdbcClient jdbcClient;
    private String tableName;
    private String columnName;

    public EntityIdValidator(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    @Override
    public void initialize(EntityId constraintAnnotation) {
        tableName = constraintAnnotation.tableName();
        columnName = constraintAnnotation.columnName();
    }

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        return jdbcClient.sql("SELECT COUNT(*) FROM " + tableName + " WHERE " + columnName + " = ?").param(value).query(Integer.class).single() == 1;
    }
}