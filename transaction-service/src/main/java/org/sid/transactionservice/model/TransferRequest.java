package org.sid.transactionservice.model;

import lombok.Data;

@Data
public class TransferRequest {
    private Long sourceAccountId;
    private Long destinationAccountId;
    private double amount;
}
