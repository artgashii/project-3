import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.scss']
})
export class OrdersAdminComponent implements OnInit {
  orders: any[] = [];
  updatedOrderData: any = {};
  showUpdateForm = false;
  selectedOrderId: number | null = null;

  constructor(private ordersService: OrdersService,) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getAllOrders().subscribe(
      (response) => {
        this.orders = response;
      },
      (error) => {
        console.error('Error loading orders:', error);
      }
    );
  }
  confirmOrder(orderId: number): void {
    console.log('Confirm Order function called with Order ID:', orderId);
    this.ordersService.updateOrder(orderId, { is_confirmed: true }).subscribe(
      (response) => {
        console.log('Order confirmed:', response);
        this.loadOrders(); 
      },
      (error) => {
        console.error('Error confirming order:', error);
      }
    );
  }
  }
  