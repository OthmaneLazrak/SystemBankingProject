package org.sid.customerservice.feign;

import org.sid.customerservice.model.Account;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name="account-service")
public interface AccountRestClient {
    @GetMapping("/accounts/findByCustomerId")
    List<Account> accountsByCustomer(@RequestParam("customerId") Long id);



}
