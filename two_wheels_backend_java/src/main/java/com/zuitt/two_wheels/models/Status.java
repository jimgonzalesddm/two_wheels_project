package com.zuitt.two_wheels.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "status")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String status;

    @OneToMany(mappedBy = "status",  cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Rental> rental;

    public Status() {}

    public Status(String status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Rental> getRental() {
        return rental;
    }

    public void setRental(List<Rental> rental) {
        this.rental = rental;
    }
}
