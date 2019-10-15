package com.zuitt.two_wheels.repositories;

import com.zuitt.two_wheels.models.Status;
import org.springframework.data.repository.CrudRepository;

public interface StatusRepository extends CrudRepository<Status, Integer> {
}
