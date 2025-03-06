package com.leopessoa.engineer.api.models.cisterns.service;

import com.leopessoa.engineer.api.models.cisterns.Cistern;
import com.leopessoa.engineer.api.models.cisterns.data.CisternResponse;
import com.leopessoa.engineer.api.models.cisterns.data.CreateCisternRequest;
import com.leopessoa.engineer.api.models.cisterns.data.UpdateCisternRequest;
import com.leopessoa.engineer.api.models.cisterns.repository.CisternRepository;
import com.leopessoa.engineer.api.models.cities.City;
import com.leopessoa.engineer.api.models.cities.repository.CityRepository;
import com.leopessoa.engineer.api.models.owners.Owner;
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

import java.util.List;

@Service
@RequiredArgsConstructor
public class CisternService {
    private final CisternRepository repository;
    private final CityRepository cityRepository;

    @Transactional
    public CisternResponse create(@Valid CreateCisternRequest request) {
        var entity = new Cistern(request);

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
        return new CisternResponse(entity);
    }

    @Transactional
    public CisternResponse update(Long id, @Valid UpdateCisternRequest request) {
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
        return new CisternResponse(entity);
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

    public PagedResponse<CisternResponse> list(String qrCode, Integer cityId, Integer stateId, Integer ownerId, Integer type, Pageable pageable) {
        var matcher = ExampleMatcher.matching()
                .withIgnoreNullValues().withMatcher("qrCode", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

        var city = new City();
        if (!(cityId == 0)) {
            city.setId(Long.valueOf(cityId));
        }

        var state = new State();
        if (!(stateId == 0)) {
            state.setId(Long.valueOf(stateId));
        }

        var owner = new Owner();
        if (!(ownerId == 0)) {
            owner.setId(Long.valueOf(ownerId));
        }

        var entity = new Cistern(qrCode, city, state, owner, type);
        Example<Cistern> example = Example.of(entity, matcher);

        var entities = repository.findAll(example, pageable);
        return new PagedResponse<>(entities.map(CisternResponse::new));
    }

    public CisternResponse detail(Long id) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }
        return new CisternResponse(findEntity.get());
    }

    public CisternResponse find(String qrCode) {
        var entity = repository.findByQrCode(qrCode);
        return entity.isPresent() ? new CisternResponse(entity.get()) : null;
    }
}
