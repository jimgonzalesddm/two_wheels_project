package com.zuitt.two_wheels.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "rentals")
public class Rental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Date rental_date;
    private Date return_date;
    private int total_rental_days;
    private double total_amount;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;

    @OneToMany(mappedBy = "rentalDetailRental", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<RentalDetail> rentalDetails;

    public Rental() {}


    public Rental(Date rental_date, Date return_date, int total_rental_days, double total_amount) {
        this.rental_date = rental_date;
        this.return_date = return_date;
        this.total_rental_days = total_rental_days;
        this.total_amount = total_amount;
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getRental_date() {
        return rental_date;
    }

    public void setRental_date(Date rental_date) {
        this.rental_date = rental_date;
    }

    public Date getReturn_date() {
        return return_date;
    }

    public void setReturn_date(Date return_date) {
        this.return_date = return_date;
    }

    public int getTotal_rental_days() {
        return total_rental_days;
    }

    public void setTotal_rental_days(int total_rental_days) {
        this.total_rental_days = total_rental_days;
    }

    public double getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(int total_amount) {
        this.total_amount = total_amount;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<RentalDetail> getRentalDetails() {
        return rentalDetails;
    }

    public void setRentalDetails(List<RentalDetail> rentalDetails) {
        this.rentalDetails = rentalDetails;
    }
}
