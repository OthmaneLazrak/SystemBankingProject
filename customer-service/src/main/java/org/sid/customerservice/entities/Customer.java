package org.sid.customerservice.entities;

import jakarta.persistence.*;
import lombok.*;
import org.sid.customerservice.model.Account;

import java.util.List;

@Entity
@NoArgsConstructor @AllArgsConstructor @Data @Builder
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    @Transient
    private List<Account> accounts;

}
