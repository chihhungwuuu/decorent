package com.allenwu.furniture.service;

import com.allenwu.furniture.entity.ProductCategory;

public interface ProductCategoryService {
    ProductCategory getById(long id);

    void save(ProductCategory tempCategory);
}
