package com.zuitt.two_wheels.controllers;

import com.zuitt.two_wheels.models.Status;
import com.zuitt.two_wheels.repositories.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/status")
@CrossOrigin(origins = "http://localhost:3000")
public class StatusController {
    @Autowired
    StatusRepository statusRepository;

    @GetMapping("/")
    public Iterable<Status> getAStatus() {
        return statusRepository.findAll();
    }

    @GetMapping("/{id}")
    public Status getStatusById(@PathVariable Integer id) {
        return statusRepository.findById(id).get();
    }

    @PostMapping("/")
    public Status addAccount(@RequestBody Status account) {
        return statusRepository.save(account);
    }

    @DeleteMapping("/{id}")
    public void deleteStatus(@PathVariable Integer id) {
        statusRepository.deleteById(id);
    }
}
