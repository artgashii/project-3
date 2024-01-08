import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthServiceService } from '../services/auth-service.service';
import { CartService } from '../services/cart.service';


interface Product {
  product_id: number;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  image: string | null;
  image_url: string | null;
  quantity?: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'] 
})
export class MainComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private authService: AuthServiceService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  getImageUrl(imageFileName: string | null): string {
    const baseUrl = 'http://localhost:3000'; 
    return imageFileName ? `${baseUrl}${imageFileName}` : '/assets/default-image.jpg';
  }


  addToCart(product_id: number, quantity: number): void {
    this.authService.getUserInfo().subscribe(
      (user) => {
        
        const user_id = user.user_id;

        this.cartService.shopingCart(product_id, quantity)
          .subscribe(
            (response) => {
              console.log('Product added to cart:', response);
             
            },
            (error) => {
              console.error('Error adding product to cart:', error);
            }
          );
      },
      (error) => {
        console.error('Error getting user info:', error);
      }
    );
  }
}

