package org.sid.transactionservice.model;

import lombok.Data;

@Data
public class Account {
    private Long id;
    private String owner;
    private Long customerId;
    private double balance;
    private String currency;
}