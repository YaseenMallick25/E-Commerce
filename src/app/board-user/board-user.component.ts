import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { UserCartService } from '../_services/userCart.service';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: number,
  name: string,
  description: string,
  category: string,
  price: number,
  image: string,
  color: string,
  size: string,
  createdAt: string,
  updatedAt: string
}

interface Quantity {
  id: number,
  quantity: number
}

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  faCircle = faCircle;
  contents: any = [];
  //products: Product[] = [];
  
  selectedCategory: string | undefined;
  categories: string[] = [ 
    'T-Shirt',
    'Casual Shirts', 
    'Formal Shirts', 
    'Jeans', 
    'Trousers', 
    'Shorts', 
    'Sweatshirts', 
    'Sweaters', 
    'Jackets', 
    'Blazers', 
    'Shoes', 
    'Socks', 
    'Accessories'
  ];

  selectedQuantity: number = 1;

  quantities: Quantity[] = [
    {id: 1, quantity: 1},
    {id: 2, quantity: 2},
    {id: 3, quantity: 3},
    {id: 4, quantity: 4},
    {id: 5, quantity: 5}
  ];
  
  changeQuantity(value : any) {
    this.selectedQuantity = value;
    console.log(value);
  }

  constructor(private productService: ProductService, private userCartService: UserCartService) { }
  
  ngOnInit(): void {
    this.productService.getAllProductContent().subscribe((data) => {
      this.contents = data;
      console.log(this.contents);
      // this.products = this.contents;
      // console.log(this.products);
     });
  }

  categoryChange(value: any) {
    console.log(value);
    this.productService.getAllProductByCategory(value).subscribe((data) => {
      this.contents = data;
      console.log(this.contents);
    });
  }

  addToCart(product: Product) {
    console.log(product.id);
    console.log(this.selectedQuantity);
    this.userCartService.addToCart(product.id,this.selectedQuantity).subscribe((data) => {
      console.log(data);
    });
  }

}
