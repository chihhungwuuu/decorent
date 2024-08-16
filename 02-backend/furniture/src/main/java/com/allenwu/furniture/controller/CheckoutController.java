package com.allenwu.furniture.controller;

import com.allenwu.furniture.dto.Purchase;
import com.allenwu.furniture.dto.PurchaseResponse;
import com.allenwu.furniture.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8088",maxAge = 3600,allowCredentials = "true")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        System.out.println("checkoutController purchase: " + purchase.toString());

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }
}
