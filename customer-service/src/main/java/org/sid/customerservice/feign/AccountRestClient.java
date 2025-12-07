package org.sid.customerservice.feign;

import org.sid.customerservice.model.Account;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name="ACCOUNT-SERVICE")
public interface AccountRestClient {
    @GetMapping("/accounts/search/findCustomerById")
    CollectionModel<Account> accountsByCustomer(@RequestParam("customerId") Long id);



}
