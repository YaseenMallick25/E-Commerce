import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/usercart/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' }) 
};

@Injectable({
    providedIn: 'root'
})

export class UserCartService {

    constructor(private http: HttpClient) { }

    getCartContent(): Observable<any> {
        return this.http.get(API_URL + '/', { responseType: 'json' });
    }

    addToCart(productid: number, quantity: number): Observable<any> {
        return this.http.post(API_URL + 'createcart', {
            productid,
            quantity
         }, httpOptions);
    }

    removeFromCart(id: number): Observable<any> {
        return this.http.delete(API_URL + 'cart/' + id, { responseType: 'json' });
    }

    clearCart(): Observable<any> {
        return this.http.delete(API_URL + 'cart', { responseType: 'json' });
    }

}