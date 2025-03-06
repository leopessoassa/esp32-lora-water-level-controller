package com.leopessoa.engineer.api.models.owners.service;

import com.leopessoa.engineer.api.models.cities.City;
import com.leopessoa.engineer.api.models.cities.repository.CityRepository;
import com.leopessoa.engineer.api.models.owners.Owner;
import com.leopessoa.engineer.api.models.owners.data.CreateOwnerRequest;
import com.leopessoa.engineer.api.models.owners.data.OwnerResponse;
import com.leopessoa.engineer.api.models.owners.data.UpdateOwnerRequest;
import com.leopessoa.engineer.api.models.owners.repository.OwnerRepository;
import com.leopessoa.engineer.api.models.states.State;
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
public class OwnerService {
    private final OwnerRepository repository;
    private final CityRepository cityRepository;


    @Transactional
    public OwnerResponse create(@Valid CreateOwnerRequest request) {
        var entity = new Owner(request);

        var findCity = cityRepository.findById(entity.getCity().getId());
        if (!findCity.isPresent()) {
            throw new QueryParameterException("Cidade não encontrada");
        }
        var city = findCity.get();
        entity.setCity(city);

        if (city.getState().getId() != entity.getState().getId()) {
            throw new QueryParameterException("Estado não pertence à cidade");
        }
        entity.setState(city.getState());

        entity = repository.save(entity);
        return new OwnerResponse(entity);
    }

    @Transactional
    public OwnerResponse update(Long id, @Valid UpdateOwnerRequest request) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }

        var entity = findEntity.get();
        entity.update(request);

        var findCity = cityRepository.findById(entity.getCity().getId());
        if (!findCity.isPresent()) {
            throw new QueryParameterException("Cidade não encontrada");
        }
        var city = findCity.get();
        entity.setCity(city);

        if (city.getState().getId() != entity.getState().getId()) {
            throw new QueryParameterException("Estado não pertence à cidade");
        }
        entity.setState(city.getState());

        entity = repository.save(entity);
        return new OwnerResponse(entity);
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

    public PagedResponse<OwnerResponse> list(String name, String email, Integer stateId, Integer cityId, Pageable pageable) {
        var matcher = ExampleMatcher.matching()
                .withIgnoreNullValues()
                .withMatcher("name", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("email", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

        var city = new City();
        if (!(cityId == 0)) {
            city.setId(Long.valueOf(cityId));
        }

        var state = new State();
        if (!(stateId == 0)) {
            state.setId(Long.valueOf(stateId));
        }

        var entity = new Owner(name, email, state, city);
        Example<Owner> example = Example.of(entity, matcher);

        var entities = repository.findAll(example, pageable);
        return new PagedResponse<>(entities.map(OwnerResponse::new));
    }

    public OwnerResponse detail(Long id) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }
        return new OwnerResponse(findEntity.get());
    }
}
