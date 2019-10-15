package com.zuitt.two_wheels.controllers;

import com.zuitt.two_wheels.models.Bicycle;
import com.zuitt.two_wheels.models.Rental;
import com.zuitt.two_wheels.models.Status;
import com.zuitt.two_wheels.models.User;
import com.zuitt.two_wheels.repositories.BicycleRepository;
import com.zuitt.two_wheels.repositories.RentalRepository;
import com.zuitt.two_wheels.repositories.StatusRepository;
import com.zuitt.two_wheels.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rentals")
@CrossOrigin(origins = "http://localhost:3000")
public class RentalController {
    @Autowired
    RentalRepository rentalRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    StatusRepository statusRepository;


    @GetMapping("/")
    public Iterable<Rental> getARental() {
        return rentalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Rental getRentalById(@PathVariable Integer id) {
        return rentalRepository.findById(id).get();
    }


    @PostMapping("/{user_id}/{status_id}")
    public Rental addRental(@RequestBody Rental rental,
                            @PathVariable Integer user_id,
                            @PathVariable Integer status_id) {
        User user = userRepository.findById(user_id).get();
        Status status = statusRepository.findById(status_id).get();
        rental.setUser(user);
        rental.setStatus(status);
        return rentalRepository.save(rental);
    }

    @DeleteMapping("/{id}")
    public void deleteRental(@PathVariable Integer id) {
        rentalRepository.deleteById(id);
    }
}
