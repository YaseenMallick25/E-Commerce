import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/api/product/';
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
    constructor(private http: HttpClient, private token: TokenStorageService) { }
  
    getAllProductContent() {
      return this.http.get(API_URL + 'all' , { responseType: 'json' });
    }
    
  }