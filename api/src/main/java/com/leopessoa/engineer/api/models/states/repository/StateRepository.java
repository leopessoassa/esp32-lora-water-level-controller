package com.leopessoa.engineer.api.models.states.repository;

import com.leopessoa.engineer.api.models.states.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
}
