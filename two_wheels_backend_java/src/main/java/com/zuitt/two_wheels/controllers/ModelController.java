package com.zuitt.two_wheels.controllers;

import com.zuitt.two_wheels.models.Model;
import com.zuitt.two_wheels.repositories.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/models")
@CrossOrigin(origins = "http://localhost:3000")
public class ModelController {
    @Autowired
    ModelRepository modelRepository;

    @GetMapping("/")
    public Iterable<Model> getAModel() {
        return modelRepository.findAll();
    }

    @GetMapping("/{id}")
    public Model getModelById(@PathVariable Integer id) {
        return modelRepository.findById(id).get();
    }

    @PostMapping("/")
    public Model addModel(@RequestBody Model model) {
        return modelRepository.save(model);
    }

    @DeleteMapping("/{id}")
    public void deleteModel(@PathVariable Integer id) {
        modelRepository.deleteById(id);
    }
}
