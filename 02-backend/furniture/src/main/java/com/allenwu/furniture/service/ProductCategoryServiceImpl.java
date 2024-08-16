package com.allenwu.furniture.service;

import com.allenwu.furniture.dao.ProductCategoryRepository;
import com.allenwu.furniture.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductCategoryServiceImpl implements  ProductCategoryService{

    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    public ProductCategoryServiceImpl(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    @Override
    public ProductCategory getById(long id) {
        Optional<ProductCategory> result = productCategoryRepository.findById(id);
        ProductCategory theProductCategory = null;

        if(result.isPresent()){
            theProductCategory = result.get();
        }else{
            throw new RuntimeException("Did not find product category id - " + id);
        }

        return theProductCategory;
    }

    @Override
    public void save(ProductCategory tempCategory) {
        productCategoryRepository.save(tempCategory);
    }
}
