package org.sid.accountservice;

import org.sid.accountservice.entities.Account;
import org.sid.accountservice.feign.CustomerRestClient;
import org.sid.accountservice.model.Customer;
import org.sid.accountservice.repositories.AccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
@EnableFeignClients
public class AccountServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccountServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(AccountRepository accountRepository, CustomerRestClient customerRestClient){
        return args -> {

            // 1️⃣ Récupérer tous les customers
            List<Customer> customers = customerRestClient.allCustomers();

            customers.forEach(customer -> {

                Account account1 = Account.builder()
                        .owner(customer.getName())
                        .customerId(customer.getId())
                        .balance(6000)
                        .build();



                accountRepository.save(account1);

                System.out.println("Accounts created for customer: " + customer.getName());
            });
        };
    }

}


