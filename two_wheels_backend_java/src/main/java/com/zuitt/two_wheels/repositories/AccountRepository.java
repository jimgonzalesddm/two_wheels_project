package com.zuitt.two_wheels.repositories;

import com.zuitt.two_wheels.models.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Integer> {
    Account findByUsername(String username);
}
