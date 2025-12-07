package org.sid.transactionservice.feign;

import org.sid.transactionservice.model.Account;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "ACCOUNT-SERVICE")
public interface AccountRestClient {

    @GetMapping("/accounts/{id}")
    Account getAccount(@PathVariable Long id);

    @PutMapping("/accounts/{id}/debit")
    Account debit(@PathVariable Long id, @RequestParam double amount);

    @PutMapping("/accounts/{id}/credit")
    Account credit(@PathVariable Long id, @RequestParam double amount);
}
