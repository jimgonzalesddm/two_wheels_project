package com.zuitt.two_wheels.controllers;


import com.zuitt.two_wheels.models.Role;
import com.zuitt.two_wheels.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
@CrossOrigin(origins = "http://localhost:3000")
public class RoleController {
    @Autowired
    RoleRepository roleRepository;

    @GetMapping("/")
    public Iterable<Role> getARole() {
        return roleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Role getRoleById(@PathVariable Integer id) {
        return roleRepository.findById(id).get();
    }

    @PostMapping("/")
    public Role addAccount(@RequestBody Role role) {
        return roleRepository.save(role);
    }

    @DeleteMapping("/{id}")
    public void deleteRole(@PathVariable Integer id) {
        roleRepository.deleteById(id);
    }
}
