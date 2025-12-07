package org.sid.accountservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.accountservice.model.Customer;

@Entity
@NoArgsConstructor @AllArgsConstructor @Data @Builder
public class Account {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String owner;
    private Long customerId;
    private double balance;
    @Transient
    private Customer customer;
}
