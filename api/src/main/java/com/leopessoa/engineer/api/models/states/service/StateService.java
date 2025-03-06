package com.leopessoa.engineer.api.models.states.service;

import com.leopessoa.engineer.api.models.states.State;
import com.leopessoa.engineer.api.models.states.data.CreateStateRequest;
import com.leopessoa.engineer.api.models.states.data.StateResponse;
import com.leopessoa.engineer.api.models.states.data.UpdateStateRequest;
import com.leopessoa.engineer.api.models.states.repository.StateRepository;
import com.leopessoa.engineer.api.util.PagedResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.hibernate.QueryParameterException;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StateService {
    private final StateRepository repository;

    @Transactional
    public StateResponse create(@Valid CreateStateRequest request) {
        var entity = new State(request);
        entity = repository.save(entity);
        return new StateResponse(entity);
    }

    @Transactional
    public StateResponse update(Long id, @Valid UpdateStateRequest request) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }

        var entity = findEntity.get();
        entity.update(request);
        entity = repository.save(entity);
        return new StateResponse(entity);
    }

    @Transactional
    public Boolean delete(Long id) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }

        var entity = findEntity.get();
        repository.delete(entity);
        return true;
    }

    public PagedResponse<StateResponse> list(String name, String uf, Pageable pageable) {
        var matcher = ExampleMatcher.matching()
                .withIgnoreNullValues()
                .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("uf", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

        var entity = new State(name, uf);
        Example<State> example = Example.of(entity, matcher);

        var entities = repository.findAll(example, pageable);
        return new PagedResponse<>(entities.map(StateResponse::new));
    }

    public StateResponse detail(Long id) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }
        return new StateResponse(findEntity.get());
    }
}
