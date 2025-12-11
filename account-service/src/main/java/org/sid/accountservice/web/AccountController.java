package org.sid.accountservice.web;

import lombok.RequiredArgsConstructor;
import org.sid.accountservice.entities.Account;
import org.sid.accountservice.repositories.AccountRepository;
import org.sid.accountservice.service.AccountServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AccountController {

    private final AccountRepository repo;
    private final AccountServiceImpl service;

    public AccountController(AccountRepository repo, AccountServiceImpl service) {
        this.repo = repo;
        this.service = service;
    }

    @GetMapping("/accounts/all")
    public List<Account> listAccounts() {
        return service.getAllAccounts();
    }

    @PostMapping("/accounts/add")
    public Account create(@RequestBody Account account) {
        return service.createAccount(account);
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

    @GetMapping("/accounts/{id}")
    public Account getAccount(@PathVariable Long id) {
        return service.getAccountById(id);
    }

}
