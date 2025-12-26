package org.sid.accountservice.repositories;

import org.sid.accountservice.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account,Long> {

    List<Account> findByCustomerId(Long customerId);
}
