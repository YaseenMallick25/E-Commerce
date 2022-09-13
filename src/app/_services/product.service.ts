import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/product/';
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  
    constructor(private http: HttpClient) { }
  
    createProduct(name: string, description: string, category: string, price: number, image: string, color: string, size: string): Observable<any> {
      return this.http.post(API_URL + 'create', {
        name,
        description,
        category,
        price,
        image,
        color,
        size
      }, { responseType: 'json' });
    }

    getAllProductContent() {
      return this.http.get(API_URL + 'all' , { responseType: 'json' });
    }

    getAllProductByCategory(category: string) {
      return this.http.get(API_URL + 'category/?category=' + category, { responseType: 'json' });
    }

    getProductContent(id: number) {
      return this.http.get(API_URL + id, { responseType: 'json' });
    }

    updateProduct(id: number, name: string, description: string, category: string, price: number, image: string, color: string, size: string): Observable<any> {
      return this.http.put(API_URL + 'update/' + id, {
        name,
        description,
        category,
        price,
        image,
        color,
        size
      }, { responseType: 'json' });
    }

    deleteProduct(id: number): Observable<any> {
      return this.http.delete(API_URL + 'delete/' + id, { responseType: 'json' });
    }

    deleteAllProduct(): Observable<any> {
      return this.http.delete(API_URL + 'delete', { responseType: 'json' });
    }
    
  }