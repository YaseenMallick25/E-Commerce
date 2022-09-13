import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Product {
  id: number,
  name: string,
  description: string,
  category: string,
  price: number,
  image: string,
  color: string,
  size: string
}

interface Category {
  id: number,
  name: string
}

interface Color {
  id: number,
  name: string
}

interface Size {
  id: number,
  name: string
}

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  contents?: any = [];
  product: Product = {} as Product;

  category: string = '';
  categories: Category[] = [
    {id: 1, name: 'T-Shirts'},
    {id: 2, name: 'Casual Shirts'},
    {id: 3, name: 'Formal Shirts'},
    {id: 4, name: 'Jeans'},
    {id: 5, name: 'Trousers'},
    {id: 6, name: 'Shorts'},
    {id: 7, name: 'Sweatshirts'},
    {id: 8, name: 'Sweaters'},
    {id: 9, name: 'Jackets'},
    {id: 10, name: 'Blazers'},
    {id: 11, name: 'Shoes'},
    {id: 12, name: 'Socks'},
    {id: 13, name: 'Accessories'}
  ];
  changeCategory(value: any) {
    this.category = value;
    //console.log(value);
  }

  color: string = '';
  colors: Color[] = [
    {id: 1, name: 'Red'},
    {id: 2, name: 'Blue'},
    {id: 3, name: 'Green'},
    {id: 4, name: 'Yellow'},
    {id: 5, name: 'Black'},
    {id: 6, name: 'White'},
    {id: 7, name: 'Orange'},
    {id: 8, name: 'Pink'},
    {id: 9, name: 'Purple'},
    {id: 10, name: 'Brown'},
    {id: 11, name: 'Grey'},
    {id: 12, name: 'Beige'},
    {id: 13, name: 'Multi-color'}
  ];
  changeColor(value: any) {
    this.color = value;
    //console.log(value);
  }

  size: string = '';
  sizes: Size[] = [
    {id: 1, name: 'XS'},
    {id: 2, name: 'S'},
    {id: 3, name: 'M'},
    {id: 4, name: 'L'},
    {id: 5, name: 'XL'},
    {id: 6, name: 'XXL'}
  ];
  changeSize(value: any) {
    this.size = value;
    //console.log(value);
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProductContent().subscribe((data) => {
      this.contents = data;
     });
  }

  onSubmit(): void {
    const { name, description, category, price, image, color, size } = this.product;

    this.productService.createProduct(name, description, this.category, price, image, this.color, size).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
