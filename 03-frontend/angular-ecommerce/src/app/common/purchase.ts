import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";
import { Receiver } from "./receiver";

export class Purchase {
    customer!:Customer;
    receiver!: Receiver;
    order!: Order;
    orderItems!: OrderItem[];
}
