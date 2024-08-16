import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './../../services/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { StorageService } from 'src/app/services/storage.service';
import { ShopValidators } from 'src/app/validators/shop-validators';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent implements OnInit{

  product!: Product;
  productUpdateFormGroup!: FormGroup;

  private roles: string[] = [];
  isLoggedIn = false;
  isEmployee:boolean = false;
  isAdmin: boolean = false;
  

  constructor(
    private storageService: StorageService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router){}

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

    this.route.paramMap.subscribe(() => {
      this.handleProductUpdate();
    })

    this.productUpdateFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        category_id: new FormControl('',
          [Validators.required]),
        sku: new FormControl('',
          [Validators.required,
            Validators.minLength(3),
            ShopValidators.notOnlyWhitespace]),
        name: new FormControl('',
          [Validators.required,
            Validators.minLength(3),
            ShopValidators.notOnlyWhitespace]),
        description:new FormControl('',
          [Validators.required,
            Validators.minLength(3),
            ShopValidators.notOnlyWhitespace]),
        unitPrice:new FormControl('',
          [Validators.required,
            ShopValidators.notOnlyWhitespace]),
        imageUrl:new FormControl('',
          [Validators.required]),
        isActive: new FormControl('',
          [Validators.required]),
        unitsInStock:new FormControl('',
          [Validators.required,
            ShopValidators.notOnlyWhitespace])
    })
  });


    
  }

  get category_id(){return this.productUpdateFormGroup.get('product.category_id');}
  get sku(){return this.productUpdateFormGroup.get('product.sku');}
  get name(){return this.productUpdateFormGroup.get('product.name');}
  get description(){return this.productUpdateFormGroup.get('product.description');}
  get unitPrice(){return this.productUpdateFormGroup.get('product.unitPrice');}
  get isActive(){return this.productUpdateFormGroup.get('product.isActive');}
  get unitsInStock(){return this.productUpdateFormGroup.get('product.unitsInStock');}


  handleProductUpdate() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
        console.log("this.product: " + JSON.stringify(this.product));
      }
    )
  }

  onSubmit() {
    console.log('Handling the product update submit...');

    if(this.productUpdateFormGroup.invalid){
      console.log("productAddFormGroup invalid");
      this.productUpdateFormGroup.markAllAsTouched();
      return
    }
    const id = this.product.id;
    const {sku,name,description,unitPrice,imageUrl,unitsInStock} = this.productUpdateFormGroup.controls['product'].value;
    let category:{id:string;} = {id: this.productUpdateFormGroup.controls['product'].value.category_id};
    let active = JSON.parse(this.productUpdateFormGroup.controls['product'].value.isActive)
    const data = {
      category,
      sku,
      name,
      description,
      unitPrice,
      imageUrl,
      active,
      unitsInStock
    }

    this.productService.updateProduct(id,data).subscribe({
      next:(res)=>{
        console.log(res);
        alert("商品已更新成功");

        // reset page
        this.productUpdateFormGroup.reset();

        // navigate back to the employee page
        this.router.navigateByUrl("/employee")

      }
    })
  }

 
}
