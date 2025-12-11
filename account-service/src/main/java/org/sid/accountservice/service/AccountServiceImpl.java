package org.sid.accountservice.service;

import lombok.RequiredArgsConstructor;
import org.sid.accountservice.entities.Account;
import org.sid.accountservice.feign.CustomerRestClient;
import org.sid.accountservice.model.Customer;
import org.sid.accountservice.repositories.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl {

    private final AccountRepository accountRepository;
    private final CustomerRestClient customerRestClient;

    public List<Account> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();

        accounts.forEach(account -> {
            Customer customer = customerRestClient.getCustomer(account.getCustomerId());
            account.setCustomer(customer);
        });

        return accounts;
    }


    public Account createAccount(Account account) {

        // 0️⃣ Sécurité : un nouveau compte ne doit pas déjà avoir un id
        if (account.getId() != null) {
            throw new RuntimeException("Un nouveau compte ne doit pas avoir d'ID");
        }

        // 1️⃣ Vérifier si le customer existe
        Customer customer = customerRestClient.getCustomer(account.getCustomerId());
        if (customer == null) {
            throw new RuntimeException("Customer not found");
        }

        // (Optionnel) s'assurer que le owner correspond au nom du client
        if (account.getOwner() == null || account.getOwner().isEmpty()) {
            account.setOwner(customer.getName());
        }

        // 2️⃣ Sauvegarde → un compte est créé pour CE customer-là
        return accountRepository.save(account);
    }

    public Account getAccountById(Long id) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Customer customer = customerRestClient.getCustomer(account.getCustomerId());
        account.setCustomer(customer);

        return account;
    }

}
