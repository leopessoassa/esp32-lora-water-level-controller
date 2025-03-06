package com.leopessoa.engineer.api.util.validators;

import jakarta.validation.Constraint;

import java.lang.annotation.*;

@Constraint(validatedBy = EntityIdValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface EntityId {
    String message() default "Entity must be existe";

    Class<?>[] groups() default {};

    Class<?>[] payload() default {};

    String columnName();

    String tableName();
}
