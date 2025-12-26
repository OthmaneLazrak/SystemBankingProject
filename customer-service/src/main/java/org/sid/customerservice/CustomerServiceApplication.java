package org.sid.customerservice;

import org.sid.customerservice.entities.Customer;
import org.sid.customerservice.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository customerRepository) {
        return args -> {

            // Init customers ONLY (no Feign calls)
            customerRepository.save(Customer.builder()
                    .name("Othmane Lazrek")
                    .email("othmane@gmail.com")
                    .build());

            customerRepository.save(Customer.builder()
                    .name("Nassim Lachkar")
                    .email("taha@gmail.com")
                    .build());

            customerRepository.save(Customer.builder()
                    .name("Omar Meftah")
                    .email("taha@gmail.com")
                    .build());

            System.out.println("✔ Customers initialized");
        };
    }
}
