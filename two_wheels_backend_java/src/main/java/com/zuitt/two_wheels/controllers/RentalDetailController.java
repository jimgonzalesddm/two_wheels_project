package com.zuitt.two_wheels.controllers;


import com.zuitt.two_wheels.models.Bicycle;
import com.zuitt.two_wheels.models.Rental;
import com.zuitt.two_wheels.models.RentalDetail;
import com.zuitt.two_wheels.repositories.BicycleRepository;
import com.zuitt.two_wheels.repositories.RentalDetailRepository;
import com.zuitt.two_wheels.repositories.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rentaldetails")
@CrossOrigin(origins = "http://localhost:3000")
public class RentalDetailController {

    @Autowired
    RentalDetailRepository rentalDetailRepository;

    @Autowired
    BicycleRepository bicycleRepository;

    @Autowired
    RentalRepository rentalRepository;

    @GetMapping("/")
    public Iterable<RentalDetail> getRentalDetails() {
        return rentalDetailRepository.findAll();
    }

    @PostMapping("/{rental_id}/{bicycle_id}")
    public void createRentalDetail(
            @RequestBody RentalDetail rentalDetail,
            @PathVariable Integer rental_id,
            @PathVariable Integer bicycle_id
    ) {
        Rental rental = rentalRepository.findById(rental_id).get();
        rentalDetail.setRentalDetailRental(rental);

        Bicycle bicycle = bicycleRepository.findById(bicycle_id).get();
        rentalDetail.setRentalDetailBicycle(bicycle);

        rentalDetailRepository.save(rentalDetail);
    }
}
