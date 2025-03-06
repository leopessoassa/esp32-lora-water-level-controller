package com.leopessoa.engineer.api.models.users.repository;

import com.leopessoa.engineer.api.models.users.User;
import com.leopessoa.engineer.api.models.users.enums.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    Page<User> findByEmailContainingAndRole(@Param("email") String email, @Param("role") Role role, Pageable pageable);
}
