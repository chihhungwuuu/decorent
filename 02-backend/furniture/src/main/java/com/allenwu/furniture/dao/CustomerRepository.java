package com.allenwu.furniture.dao;

import com.allenwu.furniture.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Customer findByEmail(String theEmail);
}
