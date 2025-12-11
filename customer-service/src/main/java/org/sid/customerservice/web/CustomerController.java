package org.sid.customerservice.web;

import org.sid.customerservice.entities.Customer;
import org.sid.customerservice.model.Account;
import org.sid.customerservice.service.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    @Autowired
    CustomerServiceImpl customerService;

    @GetMapping("/all")
    public List<Customer> allCustomer(){
        return customerService.allCustomers();
    }

    @GetMapping("/{id}")
    public Customer findCustomerById(@PathVariable Long id){
        return customerService.getCustomerById(id);
    }

    @PostMapping("/add")
    public Customer addCustomer(@RequestBody Customer customer){
        return customerService.addCustomer(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id){
        customerService.deleteCustomer(id);
    }

    @PutMapping("/{id}/update")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer){
        return customerService.updateCustomer(id, customer);
    }

}
