package com.zuitt.two_wheels.repositories;

import com.zuitt.two_wheels.models.Rental;
import org.springframework.data.repository.CrudRepository;

public interface RentalRepository extends CrudRepository<Rental, Integer> {
}
