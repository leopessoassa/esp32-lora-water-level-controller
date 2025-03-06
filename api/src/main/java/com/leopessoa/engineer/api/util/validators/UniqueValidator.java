package com.leopessoa.engineer.api.util.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Component;

@Component
public class UniqueValidator implements ConstraintValidator<Unique, String> {

    private final JdbcClient jdbcClient;
    private String tableName;
    private String columnName;

    public UniqueValidator(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    @Override
    public void initialize(Unique constraintAnnotation) {
        tableName = constraintAnnotation.tableName();
        columnName = constraintAnnotation.columnName();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        var a = jdbcClient.sql("SELECT COUNT(*) FROM " + tableName + " WHERE " + columnName + " = ?").param(value).query(Integer.class).single() == 0;
        return a;
    }
}
