import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthServiceService } from '../services/auth-service.service';


interface Product {
  product_id: number;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  image: string | null;
  image_url: string | null;
}

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrl: './main-admin.component.scss',
})
export class MainAdminComponent implements OnInit {
  products: Product[] = [];
  newProduct: any = {
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    image: null,
  };

  selectedProduct: Product | null = null; 

  constructor(private productService: ProductService, private authService: AuthServiceService) {}

  ngOnInit() {
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

  createProduct() {
    const authToken = this.authService.getToken();

    if (!authToken) {
      console.error('User not authenticated');
      return;
    }

    const productData = new FormData();
    productData.append('name', this.newProduct.name);
    productData.append('description', this.newProduct.description);
    productData.append('price', this.newProduct.price.toString());
    productData.append('stock_quantity', this.newProduct.stock_quantity.toString());
    productData.append('image', this.newProduct.image);

    this.productService.createProduct(productData, authToken).subscribe(
      (data) => {
        console.log('Product created:', data);
        this.loadProducts();
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newProduct.image = file;
    }
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }
  setProductIdForDeletion(productId: number): void {
    if (productId) {
     
      this.selectedProduct = this.products.find(product => product.product_id === productId) || null;
    }
  }

  updateProduct() {
    if (!this.selectedProduct) {
      console.error('No product selected for update');
      return;
    }

    const authToken = this.authService.getToken();

    if (!authToken) {
      console.error('User not authenticated');
      return;
    }

    const productData = new FormData();
    productData.append('name', this.selectedProduct.name);
    productData.append('description', this.selectedProduct.description || '');
    productData.append('price', this.selectedProduct.price.toString());
    productData.append('stock_quantity', this.selectedProduct.stock_quantity.toString());

 
    if (this.newProduct.image instanceof File) {
      productData.append('image', this.newProduct.image);
    }

    this.productService.updateProduct(this.selectedProduct.product_id, productData, authToken).subscribe(
      (data) => {
        console.log('Product updated:', data);
        this.selectedProduct = null;
        this.loadProducts();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  deleteProduct(): void {
    
    if (this.selectedProduct !== null && this.selectedProduct.product_id !== null) {
    
      const authToken = this.authService.getToken();
      if (!authToken) {
        console.error('User not authenticated');
        return;
      }
  
      this.productService.deleteProduct(this.selectedProduct.product_id, authToken)
        .subscribe(
          response => {
           
            console.log('Product deleted successfully:', response);
  
            
            this.selectedProduct = null;
          },
          error => {
            console.error('Error deleting product:', error);
          }
        );
    } else {
      console.error('No product selected for delete');
    }
  }
  logout(): void {
    this.authService.logout();
  }
}
