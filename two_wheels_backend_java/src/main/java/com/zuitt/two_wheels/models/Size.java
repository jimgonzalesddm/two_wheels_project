package com.zuitt.two_wheels.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "sizes")
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String size;

    @OneToMany(mappedBy = "size", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Bicycle> bicycles;

    public Size() {}

    public Size(String size) {
        this.size = size;
    }

    public int getId() {
        return id;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public List<Bicycle> getBicycles() {
        return bicycles;
    }

    public void setBicycles(List<Bicycle> bicycles) {
        this.bicycles = bicycles;
    }
}
