import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';

interface Product {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  cart_item_id: number;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService,
    private ordersService: OrdersService ) {}

  ngOnInit(): void {
    this.cartService.getShoppingCart().subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
        console.log('Shopping Cart Items:', this.cartItems);
      },
      (error) => {
        console.error('Error getting shopping cart:', error);
      }
    );
  }

  getImageUrl(imageFileName: string | null): string {
    const baseUrl = 'http://localhost:3000';
    return imageFileName ? `${baseUrl}${imageFileName}` : '/assets/default-image.jpg';
  }

  deleteCartItem(cart_item_id: number): void {
    this.cartService.deleteShoppingCartItem(cart_item_id).subscribe(
      (response) => {
        console.log('Item removed from cart:', response);
        
        location.reload();
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  clearShoppingCart(): void {
    this.cartService.clearShoppingCart().subscribe(
      (response) => {
        console.log('Shopping cart cleared:', response);
      },
      (error) => {
        console.error('Error clearing shopping cart:', error);
      }
    );
  }
  createOrder(): void {
    const orderItems = this.cartItems.map(item => ({
      product_id: item.product.product_id, 
      quantity: item.quantity,
      price: item.product.price * item.quantity, 
    }));
  
    
    const total_amount = orderItems.reduce((total, item) => total + item.price, 0);
 
    this.ordersService.createOrder({ total_amount, order_items: orderItems }).subscribe(
      (response) => {
        console.log('Order created:', response);
     
        location.reload();
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }
}
