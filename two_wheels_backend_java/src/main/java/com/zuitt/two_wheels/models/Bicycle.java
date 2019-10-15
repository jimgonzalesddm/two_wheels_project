package com.zuitt.two_wheels.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "bicycles")
public class Bicycle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String image;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;

    @ManyToOne
    @JoinColumn(name = "size_id")
    private Size size;

    private double price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "rentalDetailBicycle", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<RentalDetail> rentalDetails;

    public Bicycle() {}

    public Bicycle(double price) {
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<RentalDetail> getRentalDetails() {
        return rentalDetails;
    }

    public void setRentalDetails(List<RentalDetail> rentalDetails) {
        this.rentalDetails = rentalDetails;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
