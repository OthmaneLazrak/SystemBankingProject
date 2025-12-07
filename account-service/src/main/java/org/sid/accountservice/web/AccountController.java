package org.sid.accountservice.web;

import org.sid.accountservice.entities.Account;
import org.sid.accountservice.repositories.AccountRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    private final AccountRepository repo;

    public AccountController(AccountRepository repo) {
        this.repo = repo;
    }

    @PutMapping("/accounts/{id}/debit")
    public Account debit(@PathVariable Long id, @RequestParam double amount) {
        Account acc = repo.findById(id).orElseThrow();
        if (acc.getBalance() < amount) throw new RuntimeException("Balance insuffisante");
        acc.setBalance(acc.getBalance() - amount);
        return repo.save(acc);
    }

    @PutMapping("/accounts/{id}/credit")
    public Account credit(@PathVariable Long id, @RequestParam double amount) {
        Account acc = repo.findById(id).orElseThrow();
        acc.setBalance(acc.getBalance() + amount);
        return repo.save(acc);
    }
}
