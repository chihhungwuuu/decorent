package com.allenwu.furniture.controller;

import com.allenwu.furniture.entity.Product;
import com.allenwu.furniture.entity.ProductCategory;
import com.allenwu.furniture.service.ProductCategoryService;
import com.allenwu.furniture.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@CrossOrigin(origins = "http://localhost:8088",maxAge=3600,allowCredentials = "true")
@RepositoryRestController
public class ProductController {
    private ProductService productService;
    private ProductCategoryService productCategoryService;

    @Autowired
    public ProductController(ProductService productService, ProductCategoryService productCategoryService) {
        this.productService = productService;
        this.productCategoryService = productCategoryService;
    }


    @RequestMapping(method = POST,value = "/products")
    public ResponseEntity<?> createProduct(@RequestBody Product product){
        System.out.println("Product save called...");
        System.out.println(product.getCategory().getId());

        ProductCategory tempCategory = productCategoryService.getById(Long.valueOf(product.getCategory().getId()));

        List<Product> products = new ArrayList<>();

        // new Product
        Product newProduct = new Product(
                product.getSku(),
                product.getName(),
                product.getDescription(),
                product.getUnitPrice(),
                product.getImageUrl(),
                product.isActive(),
                product.getUnitsInStock());

        // set category to product
        newProduct.setCategory(tempCategory);

        // add product to list
        products.add(newProduct);

        // add Product list to ProductCategory
        tempCategory.setProducts(products);

        // save ProductCategory
        productCategoryService.save(tempCategory);

        System.out.println("Saved!!");
        return ResponseEntity.ok("新增成功");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") long id){
        System.out.println("Product delete...");
        productService.deleteById(id);

        System.out.println("商品成功刪除!!");

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @PutMapping("/{id}")
    @RequestMapping(method = PUT,value = "/products/{id}")
    public ResponseEntity<Product> updataProduct(@PathVariable("id") long id, @RequestBody Product productRequest){
        System.out.println("Product update called...");
        Product product = productService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProductId " + id + "not found"));
        product.setSku(productRequest.getSku());
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setUnitPrice(productRequest.getUnitPrice());
        product.setImageUrl(productRequest.getImageUrl());
        product.setActive(productRequest.isActive());
        product.setUnitsInStock(productRequest.getUnitsInStock());

        productService.save(product);
        System.out.println("商品修改成功");
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
