package com.leopessoa.engineer.api.models.waterLevels.service;

import com.leopessoa.engineer.api.models.cisterns.repository.CisternRepository;
import com.leopessoa.engineer.api.models.waterLevels.WaterLevel;
import com.leopessoa.engineer.api.models.waterLevels.data.CreateWaterLevelRequest;
import com.leopessoa.engineer.api.models.waterLevels.data.UpdateWaterLevelRequest;
import com.leopessoa.engineer.api.models.waterLevels.data.WaterLevelResponse;
import com.leopessoa.engineer.api.models.waterLevels.repository.WaterLevelRepository;
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
public class WaterLevelService {
    private final WaterLevelRepository repository;
    private final CisternRepository cisternRepository;

    @Transactional
    public WaterLevelResponse create(@Valid CreateWaterLevelRequest request) throws Throwable {
        var entity = new WaterLevel(request);

        var cistern = cisternRepository.findByQrCode(request.getQrCode())
                .orElseThrow(() -> new QueryParameterException("Cisterna não existe"));

        entity.setCistern(cistern);
        entity = repository.save(entity);
        return new WaterLevelResponse(entity);
    }

    @Transactional
    public WaterLevelResponse update(Long id, @Valid UpdateWaterLevelRequest request) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }

        var entity = findEntity.get();
        entity.update(request);

        var findCistern = cisternRepository.findById(entity.getCistern().getId());
        if (!findCistern.isPresent()) {
            throw new QueryParameterException("Cisterna não encontrada");
        }
        var cistern = findCistern.get();
        entity.setCistern(cistern);

        entity = repository.save(entity);
        return new WaterLevelResponse(entity);
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

    public PagedResponse<WaterLevelResponse> list(String qrCode, Pageable pageable) {
        var matcher = ExampleMatcher.matching()
                .withIgnoreNullValues()
                .withMatcher("qrCode", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

        var entity = new WaterLevel();
        if (!qrCode.isEmpty() && !qrCode.isBlank() && qrCode != null ) {
            var cistern = cisternRepository.findByQrCode(qrCode);
            if (cistern.isPresent()) {
                throw new QueryParameterException("Cisterna não existe");
            }
            entity.setCistern(cistern.get());
        }

        Example<WaterLevel> example = Example.of(entity, matcher);

        var entities = repository.findAll(example, pageable);
        return new PagedResponse<>(entities.map(WaterLevelResponse::new));
    }

    public WaterLevelResponse detail(Long id) {
        var findEntity = repository.findById(id);
        if (!findEntity.isPresent()) {
            throw new QueryParameterException("Modelo não encontrado");
        }
        return new WaterLevelResponse(findEntity.get());
    }
}
