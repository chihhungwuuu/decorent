package com.allenwu.furniture.service;

import com.allenwu.furniture.dao.CustomerRepository;
import com.allenwu.furniture.dao.ReceiverRepository;
import com.allenwu.furniture.dto.Purchase;
import com.allenwu.furniture.dto.PurchaseResponse;
import com.allenwu.furniture.entity.Customer;
import com.allenwu.furniture.entity.Order;
import com.allenwu.furniture.entity.OrderItem;
import com.allenwu.furniture.entity.Receiver;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;
    private ReceiverRepository receiverRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository,ReceiverRepository receiverRepository){
        this.customerRepository = customerRepository;
        this.receiverRepository = receiverRepository;

    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // populate receiver with order
        Receiver receiver = purchase.getReceiver();
        receiverRepository.save(receiver);
        System.out.println("receiver: " + receiver);

        // populate customer with order
        Customer customer = purchase.getCustomer();
        System.out.println("customer: " + customer.toString());

        // check if this is an existing customer
        String theEmail = customer.getEmail();

        Customer customerFromDB = customerRepository.findByEmail(theEmail);

        if(customerFromDB != null){
            // we found them ... let's assign them accordingly
            customer = customerFromDB;
        }
        customer.add(order);

        // save to the database
        customerRepository.save(customer);

        // return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        // generate a random UUID number (UUID version-4)
        // For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
        //
        return UUID.randomUUID().toString();
    }
}
