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

import java.util.Collection;

@SpringBootApplication
@EnableFeignClients
public class AccountServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccountServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(AccountRepository accountRepository, CustomerRestClient customerRestClient){
        return args ->{
            Collection<Customer> customers = customerRestClient.allCustomers().getContent();

            customers.forEach(customer->{
                        accountRepository.save(Account.builder()
                                .owner(customer.getName())
                                .customerId(customer.getId())
                                .balance(6000)
                                .build());
                    }
                    );

        };
    }

}
