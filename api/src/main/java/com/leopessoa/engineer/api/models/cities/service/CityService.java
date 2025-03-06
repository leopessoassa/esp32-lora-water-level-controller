package com.leopessoa.engineer.api.models.cities.service;

import com.leopessoa.engineer.api.models.cities.City;
import com.leopessoa.engineer.api.models.cities.data.CityResponse;
import com.leopessoa.engineer.api.models.cities.data.CreateCityRequest;
import com.leopessoa.engineer.api.models.cities.data.UpdateCityRequest;
import com.leopessoa.engineer.api.models.cities.repository.CityRepository;
import com.leopessoa.engineer.api.models.states.State;
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
public class CityService {
    private final CityRepository repository;
    private final StateRepository stateRepository;

    @Transactional
    public CityResponse create(@Valid CreateCityRequest request) {
        var entity = new City(request);

        var findState = stateRepository.findById(entity.getState().getId());
        if (!findState.isPresent()) {
            throw new QueryParameterException("Estado não encontrado");
        }
        var state = findState.get();
        entity.setState(state);

        entity = repository.save(entity);
        return new CityResponse(entity);
    }

    @Transactional
    public CityResponse update(Long id, @Valid UpdateCityRequest request) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }

        var entity = findEntity.get();
        entity.update(request);

        var findState = stateRepository.findById(entity.getState().getId());
        if (!findState.isPresent()) {
            throw new QueryParameterException("Estado não encontrado");
        }
        var state = findState.get();
        entity.setState(state);

        entity = repository.save(entity);
        return new CityResponse(entity);
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

    public PagedResponse<CityResponse> list(String name, String uf, Boolean isCapital, Pageable pageable) {
        var matcher = ExampleMatcher.matching()
                .withIgnoreNullValues().withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("uf", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

        var state = new State();
        if (!uf.isEmpty() && !uf.isBlank()) {
            state.setUf(uf);
        }
        var entity = new City(name, isCapital, state);
        Example<City> example = Example.of(entity, matcher);

        var entities = repository.findAll(example, pageable);
        return new PagedResponse<>(entities.map(CityResponse::new));
    }

    public CityResponse detail(Long id) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }
        return new CityResponse(findEntity.get());
    }
}
