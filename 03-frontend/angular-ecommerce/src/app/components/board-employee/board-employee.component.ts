import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board-employee',
  templateUrl: './board-employee.component.html',
  styleUrl: './board-employee.component.css'
})
export class BoardEmployeeComponent  implements OnInit{

  content?: string;
  products: Product[] = [];

  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "所有商品";

  private roles: string[] = [];
  isLoggedIn = false;
  isEmployee:boolean = false;
  isAdmin: boolean = false;

    // new properties for pagination
    thePageNumber: number = 1;
    thePageSize: number = 8;
    theTotalElements: number = 0;

  constructor(private userService: UserService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private storageService:StorageService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    console.log("isLoggedIn: " + this.isLoggedIn);

    if(this.isLoggedIn){
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.isEmployee = this.roles.includes('ROLE_EMPLOYEE');
      console.log("isEmployee: " + this.isEmployee);
      this.isAdmin = this.roles.includes("ROLE_ADMIN");
    }


    this.userService.getEmployeeBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if(err.error){
          try{
            const res = JSON.parse(err.error);
            this.content = res.message;
          }catch{
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        }else{
          this.content = `Error with status: ${err.status}`;
        }
      }
    });

    this.handleListProducts();
  }
  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')


    if(!hasCategoryId){
      this.productService.getAllProductListPaginate(this.thePageNumber - 1,
                                                    this.thePageSize)
                                                    .subscribe(this.processResult());
    }
    else{
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId},thePageNumber=${this.thePageNumber}`)


    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1 ,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());
    }
  }
  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.handleListProducts();
    }

}
