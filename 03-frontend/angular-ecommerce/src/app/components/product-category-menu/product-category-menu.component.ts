import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit{

  productCategories: ProductCategory[] = [];
  products: Product[] = [];

  private roles:string[] = [];
  isLoggedIn = false;
  isEmployee: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private storageService: StorageService
  ){}

  ngOnInit(): void {
    this.listProductCategories();

    this.isLoggedIn = this.storageService.isLoggedIn();
    console.log("isLoggedIn: " + this.isLoggedIn);

    if(this.isLoggedIn){
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.isEmployee = this.roles.includes('ROLE_EMPLOYEE');
      console.log("isEmployee: " + this.isEmployee);
      this.isAdmin = this.roles.includes('ROLE_ADMIN');
    }

  }
 
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
