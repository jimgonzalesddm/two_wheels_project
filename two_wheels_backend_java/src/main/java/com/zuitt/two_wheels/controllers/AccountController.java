package com.zuitt.two_wheels.controllers;

import com.zuitt.two_wheels.models.Account;

import com.zuitt.two_wheels.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {
    @Autowired
    AccountRepository accountRepository;

    @GetMapping("/")
    public Iterable<Account> getAccounts() {
        return accountRepository.findAll();
    }

    @GetMapping("/{id}")
    public Account getAccountById(@PathVariable Integer id) {
        return accountRepository.findById(id).get();
    }

    @PostMapping("/register")
    public Account registerAccount(@RequestBody Account account) {
        String hashedpw = BCrypt.hashpw(account.getPassword(), BCrypt.gensalt());
        account.setPassword(hashedpw);
        return accountRepository.save(account);
    }

    @PostMapping("/login")
    public Account loginAccount(@RequestBody Account account) {
        Account foundAccount = accountRepository.findByUsername(account.getUsername());
        if(foundAccount != null && BCrypt.checkpw(account.getPassword(), foundAccount.getPassword())) {
            return foundAccount;
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable Integer id) {
        accountRepository.deleteById(id);
    }

}
