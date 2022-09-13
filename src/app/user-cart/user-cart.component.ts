import { Component, OnInit } from '@angular/core';
import { UserCartService } from '../_services/userCart.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  constructor(private userCartService : UserCartService ) { }

  ngOnInit(): void {
    this.userCartService.getCartContent().subscribe((data) => {
      console.log(data);
    });
  }

}
