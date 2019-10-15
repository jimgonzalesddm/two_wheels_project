package com.zuitt.two_wheels.controllers;

import com.zuitt.two_wheels.models.Account;
import com.zuitt.two_wheels.models.Role;
import com.zuitt.two_wheels.models.User;
import com.zuitt.two_wheels.repositories.AccountRepository;
import com.zuitt.two_wheels.repositories.RoleRepository;
import com.zuitt.two_wheels.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    RoleRepository roleRepository;

    @GetMapping("/")
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userRepository.findById(id).get();
    }

//    @PostMapping("/{role_id}")
//    public User addUser(@RequestBody User user,
//                        @PathVariable Integer role_id) {
//        Role role = roleRepository.findById(role_id).get();
//        user.setRole(role);
//        return userRepository.save(user);
//    }

    @PostMapping("/register/{role_id}")
    public User registerUser(@RequestBody User user,
                             @PathVariable Integer role_id) {
        Role role = roleRepository.findById(role_id).get();
        user.setRole(role);
        String hashedpw = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedpw);
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        User foundUser = userRepository.findByUsername(user.getUsername());
        if(foundUser != null && BCrypt.checkpw(user.getPassword(), foundUser.getPassword())) {
            return foundUser;
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userRepository.deleteById(id);
    }
}
