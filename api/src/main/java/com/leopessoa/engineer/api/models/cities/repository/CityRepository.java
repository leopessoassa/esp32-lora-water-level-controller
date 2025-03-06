package com.leopessoa.engineer.api.models.cities.repository;

import com.leopessoa.engineer.api.models.cities.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
}
