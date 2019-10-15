package com.zuitt.two_wheels.repositories;

import com.zuitt.two_wheels.models.Bicycle;
import org.springframework.data.repository.CrudRepository;

public interface BicycleRepository extends CrudRepository<Bicycle, Integer> {
}
