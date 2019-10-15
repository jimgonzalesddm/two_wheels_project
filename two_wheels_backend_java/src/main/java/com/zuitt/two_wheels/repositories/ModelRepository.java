package com.zuitt.two_wheels.repositories;

import com.zuitt.two_wheels.models.Model;
import org.springframework.data.repository.CrudRepository;

public interface ModelRepository extends CrudRepository<Model, Integer> {
}
