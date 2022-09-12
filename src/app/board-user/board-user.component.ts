import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content: any = [];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getAllProductContent().subscribe((r)=> {
       this.content=r;
       console.log(this.content);
     });
    
  }
}
