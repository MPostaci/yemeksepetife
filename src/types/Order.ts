export interface Order {
    orderId: number;
    userId: number;
    restaurantId: number;
    orderDate: string;         // e.g. "2025-03-11T16:05:39.017"
    totalAmount: number;       // e.g. 123.00
    orderDetails: OrderDetail[];
    statusHistory: OrderStatusHistory[];
  }
  
  export interface OrderDetail {
    orderDetailId: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
  }
  
  export interface OrderStatusHistory {
    id: number;
    orderId: number;
    orderStatusId: number; // e.g. 1, 2, 3, ...
    changedAt: string;     // e.g. "2025-03-11T14:23:39.35"
  }