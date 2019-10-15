package com.zuitt.two_wheels.controllers;

import com.zuitt.two_wheels.models.Size;
import com.zuitt.two_wheels.repositories.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sizes")
@CrossOrigin(origins = "http://localhost:3000")
public class SizeController {
    @Autowired
    SizeRepository sizeRepository;

    @GetMapping("/")
    public Iterable<Size> getASize() {
        return sizeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Size getSizeById(@PathVariable Integer id) {
        return sizeRepository.findById(id).get();
    }

    @PostMapping("/")
    public Size addAccount(@RequestBody Size size) {
        return sizeRepository.save(size);
    }

    @DeleteMapping("/{id}")
    public void deleteSize(@PathVariable Integer id) {
        sizeRepository.deleteById(id);
    }
}
