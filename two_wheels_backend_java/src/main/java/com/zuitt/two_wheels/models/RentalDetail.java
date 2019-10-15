package com.zuitt.two_wheels.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "rentaldetails")
public class RentalDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "rental_id")
    private Rental rentalDetailRental;

    @ManyToOne
    @JoinColumn(name = "bicycle_id")
    private Bicycle rentalDetailBicycle;

    public RentalDetail() {
    }

    public RentalDetail(int quantity) {
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Rental getRentalDetailRental() {
        return rentalDetailRental;
    }

    public void setRentalDetailRental(Rental rentalDetailRental) {
        this.rentalDetailRental = rentalDetailRental;
    }

    public Bicycle getRentalDetailBicycle() {
        return rentalDetailBicycle;
    }

    public void setRentalDetailBicycle(Bicycle rentalDetailBicycle) {
        this.rentalDetailBicycle = rentalDetailBicycle;
    }
}