package com.allenwu.furniture.service;

import com.allenwu.furniture.dto.Purchase;
import com.allenwu.furniture.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

}
