package com.zuitt.two_wheels.repositories;

import com.zuitt.two_wheels.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
