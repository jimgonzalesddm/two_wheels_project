package com.zuitt.two_wheels.repositories;

import com.zuitt.two_wheels.models.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
}
