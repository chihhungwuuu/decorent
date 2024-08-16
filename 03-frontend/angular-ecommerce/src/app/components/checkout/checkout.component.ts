import { Receiver } from './../../common/receiver';
import { ShopFormService } from '../../services/shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';

import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  storage: Storage = sessionStorage;

  constructor(private formBuilder: FormBuilder,
              private ShopFormService: ShopFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router){}

  ngOnInit(): void {

    this.reviewCartDetails();
   
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        name: new FormControl('',
          [Validators.required,
           Validators.minLength(2),
           ShopValidators.notOnlyWhitespace]),
        email: new FormControl('',
                              [Validators.required,
                               Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        cellphone: new FormControl('',
                              [Validators.required,
                               Validators.pattern('[0-9]{10}'),
                               ShopValidators.notOnlyWhitespace])
      }),
      receiver: this.formBuilder.group({
        name:new FormControl('',
                                  [Validators.required,
                                   Validators.minLength(2),
                                   ShopValidators.notOnlyWhitespace]),
        email: new FormControl('',
                              [Validators.required,
                               Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        cellphone:new FormControl('',
                                  [Validators.required,
                                   Validators.pattern('[0-9]{10}'),
                                   ShopValidators.notOnlyWhitespace]),
        address:new FormControl('',
                                    [Validators.required,
                                    ShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType:new FormControl('',[Validators.required]),
        cardNumber:new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
        securityCode:new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
        expirationMonth:[''],
        expirationYear:['']
      })
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card years
    this.ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

  }

  reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity=totalQuantity
    );
    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice=totalPrice
    );
  }

  get customerName(){ return this.checkoutFormGroup.get('customer.name');}
  get customerEmail(){ return this.checkoutFormGroup.get('customer.email');}
  get customerCellphone(){return this.checkoutFormGroup.get('customer.cellphone');}

  get receiverName(){ return this.checkoutFormGroup.get('receiver.name');}
  get receiverEmail(){ return this.checkoutFormGroup.get('receiver.email');}
  get receiverCellphone(){ return this.checkoutFormGroup.get('receiver.cellphone');}
  get receiverAddress(){ return this.checkoutFormGroup.get('receiver.address');}
  get creditCardType(){ return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameOnCard(){ return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber(){ return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode(){ return this.checkoutFormGroup.get('creditCard.securityCode');}

  copyCustomerToReceiver(event:any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['receiver']
       .patchValue(this.checkoutFormGroup.controls['customer'].value);
        

    }
    else {
      this.checkoutFormGroup.controls['receiver'].reset();
    
    }
    
  }

  onSubmit(){
    console.log("Handling the submit button");

    if(this.checkoutFormGroup.invalid){
      console.log("checkoutFormGroup invalid");
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order(this.totalQuantity,this.totalPrice);

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: OrderItem[] = cartItems.map
                                  (tempCartItem => new OrderItem
                                    (tempCartItem.imageUrl!, 
                                    tempCartItem.unitPrice!, 
                                    tempCartItem.quantity, 
                                    tempCartItem.id!));
    
    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;


    // populate purchase - shipping address
    purchase.receiver = this.checkoutFormGroup.controls['receiver'].value;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

        // reset cart
        this.resetCart();

      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
  );

    
  }
  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    
    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }

    this.ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }
  
}
