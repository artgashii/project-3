import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  userOrders: any[] = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.loadUserOrders();
  }

  loadUserOrders(): void {
    this.ordersService.getUserOrders().subscribe(
      (response) => {
        this.userOrders = response;
      },
      (error) => {
        console.error('Error loading user orders:', error);
      }
    );
  }
}
