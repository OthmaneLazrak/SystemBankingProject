package org.sid.transactionservice.web;


import lombok.RequiredArgsConstructor;
import org.sid.transactionservice.entities.Transaction;
import org.sid.transactionservice.feign.AccountRestClient;
import org.sid.transactionservice.model.TransferRequest;
import org.sid.transactionservice.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/transactions")
public class TransactionController {


    private final TransactionRepository repo;
    private final AccountRestClient accountRestClient;

    public TransactionController(TransactionRepository repo, AccountRestClient accountRestClient) {
        this.repo = repo;
        this.accountRestClient = accountRestClient;
    }

    @PostMapping("/transfer")
    public Transaction transfer(@RequestBody TransferRequest req) {

        // Débiter le compte source
        accountRestClient.debit(req.getSourceAccountId(), req.getAmount());

        // Créditer le compte destination
        accountRestClient.credit(req.getDestinationAccountId(), req.getAmount());

        // Enregistrer la transaction
        Transaction tr = Transaction.builder()
                .sourceAccountId(req.getSourceAccountId())
                .destinationAccountId(req.getDestinationAccountId())
                .amount(req.getAmount())
                .date(LocalDateTime.now())
                .build();

        return repo.save(tr);
    }
}