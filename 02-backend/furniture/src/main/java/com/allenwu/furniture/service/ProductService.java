package com.allenwu.furniture.service;

import com.allenwu.furniture.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Page<Product> findAll(Pageable pageable);

    Optional<Product> findById(long theId);

    void save(Product theProduct);

    void deleteById(long theId);
}
