import { Component, OnInit } from '@angular/core';
import { UserCartService } from '../_services/userCart.service';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

interface UserCart {
  id: number,
  productId: number,
  quantity: number,
  createdAt: string,
  updatedAt: string
}

interface Product {
  id: number,
  name: string,
  description: string,
  category: string,
  price: number,
  image: string,
  color: string,
  size: string,
}

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})

export class UserCartComponent implements OnInit {

  faCircle = faCircle;
  faTrash = faTrash;

  contents: any = [];
  
  totalPrice : any | undefined;

  constructor(
    private userCartService : UserCartService, 
    private router : Router 
  ) { }

  ngOnInit(): void {
    this.userCartService.getCartContent().subscribe((data) => {
      this.contents = data;
      console.log(this.contents);

      let total = 0;
      for (const element of this.contents) {
        total += element.product.price * element.quantity;
      }
      this.totalPrice = total;

    });    

  }

  deleteCartById(id: number) {
    this.userCartService.removeFromCart(id).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }


}
