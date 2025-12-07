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
        return args -> {
            // 1️⃣ Récupérer tous les customers depuis customer-service
            Collection<Customer> customers = customerRestClient.allCustomers().getContent();

            // 2️⃣ Pour chaque customer, créer un compte et lui associer le customer complet
            customers.forEach(customer -> {

                Account account1 = Account.builder()
                        .owner(customer.getName())
                        .customerId(customer.getId())
                        .balance(6000)
                        .build();
                Account account2 = Account.builder()
                        .owner(customer.getName())
                        .customerId(customer.getId())
                        .balance(6000)
                        .build();

                // 3️⃣ Intégrer le customer dans l'objet Account
                account1.setCustomer(customer);
                account2.setCustomer(customer);


                // 4️⃣ Sauvegarde dans la base
                accountRepository.save(account1);
                accountRepository.save(account2);


                System.out.println("Account 1 created for " + account1.getOwner());
                System.out.println("Customer info: " + account1.getCustomer());

                System.out.println("Account 2 created for " + account2.getOwner());
                System.out.println("Customer info: " + account2.getCustomer());

            });
        };
    }

}
