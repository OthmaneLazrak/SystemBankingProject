package org.sid.customerservice;

import org.sid.customerservice.entities.Customer;
import org.sid.customerservice.feign.AccountRestClient;
import org.sid.customerservice.model.Account;
import org.sid.customerservice.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
@EnableFeignClients
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository customerRepository, AccountRestClient accountRestClient){
        return args ->{

            customerRepository.save(Customer.builder()
                            .name("Othmane Lazrek")
                            .email("othmane@gmail.com")
                            .build());
            customerRepository.save((Customer.builder()
                    .name("Taha Karrada")
                    .email("taha@gmail.com")
                    .build()));
        };
    }

}
