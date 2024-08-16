package com.allenwu.furniture.service;

import com.allenwu.furniture.dao.ProductRepository;
import com.allenwu.furniture.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{

    private ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Optional<Product> findById(long theId) {
        return productRepository.findById(theId);
    }

    @Override
    public void save(Product theProduct) {
        productRepository.save(theProduct);
    }

    @Override
    public void deleteById(long theId) {
        productRepository.deleteById(theId);
    }
}
