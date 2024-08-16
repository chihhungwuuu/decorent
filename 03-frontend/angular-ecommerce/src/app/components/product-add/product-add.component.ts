import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit{

  productAddFormGroup!:FormGroup;

  isSuccessful = false;

  private roles: string[] = [];
  isLoggedIn = false;
  isEmployee:boolean = false;
  isAdmin: boolean = false;


  constructor(
    private storageService: StorageService,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ){}

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

    this.productAddFormGroup = this.formBuilder.group({
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
            Validators.minLength(3),
            ShopValidators.notOnlyWhitespace]),
        imageUrl:new FormControl('assets/images/default.png',
          [Validators.required]),
        isActive: new FormControl('',
          [Validators.required]),
        unitsInStock:new FormControl('',
          [Validators.required,
            ShopValidators.notOnlyWhitespace])
    })
  });
}

  get category_id(){return this.productAddFormGroup.get('product.category_id');}
  get sku(){return this.productAddFormGroup.get('product.sku');}
  get name(){return this.productAddFormGroup.get('product.name');}
  get description(){return this.productAddFormGroup.get('product.description');}
  get unitPrice(){return this.productAddFormGroup.get('product.unitPrice');}
  get isActive(){return this.productAddFormGroup.get('product.isActive');}
  get unitsInStock(){return this.productAddFormGroup.get('product.unitsInStock');}

onSubmit() {
  console.log('Handling the product add submit...');

  if(this.productAddFormGroup.invalid){
    console.log("productAddFormGroup invalid");
    this.productAddFormGroup.markAllAsTouched();
    return
  }

  const {sku,name,description,unitPrice,imageUrl,unitsInStock} = this.productAddFormGroup.controls['product'].value;
  let category:{id:string;} = {id: this.productAddFormGroup.controls['product'].value.category_id};
  let active = JSON.parse(this.productAddFormGroup.controls['product'].value.isActive)

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

  console.log("data: " + JSON.stringify(data))

  
  this.productService.createProduct(data).subscribe({
    next: (res) => {
      alert("商品已新增成功");

      // reset page
      this.productAddFormGroup.reset();
    },
    error:(e) => console.error(e)
  });
  }

  

  
}

