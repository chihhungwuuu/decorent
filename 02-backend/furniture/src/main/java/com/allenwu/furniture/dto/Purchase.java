package com.allenwu.furniture.dto;

import com.allenwu.furniture.entity.Customer;
import com.allenwu.furniture.entity.Order;
import com.allenwu.furniture.entity.OrderItem;
import com.allenwu.furniture.entity.Receiver;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Receiver receiver;
    private Order order;
    private Set<OrderItem> orderItems;

    @Override
    public String toString() {
        return "Purchase{" +
                "customer=" + customer.toString() +
                ", receiver=" + receiver.toString() +
                ", order=" + order +
                ", orderItems=" + orderItems +
                '}';
    }
}
