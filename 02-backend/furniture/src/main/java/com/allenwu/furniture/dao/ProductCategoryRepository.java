package com.allenwu.furniture.dao;

import com.allenwu.furniture.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin(origins = "http://localhost:8088",maxAge = 3600,allowCredentials = "true")
@RepositoryRestResource(collectionResourceRel = "productCategory",path="product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
