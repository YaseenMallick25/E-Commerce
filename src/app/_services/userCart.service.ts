import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/cart/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' }) 
};

@Injectable({
    providedIn: 'root'
})

export class UserCartService {

    constructor(private http: HttpClient) { }

    //Create New Cart Content
    addToCart(productid: number, quantity: number): Observable<any> {
        return this.http.post(API_URL, {
            productid,
            quantity
         }, httpOptions);
    }

    //Get All Cart Content
    getCartContent(): Observable<any> {
        return this.http.get(API_URL, { responseType: 'json' });
    }

    //Delete Cart Content by cartid
    removeFromCart(id: number): Observable<any> {
        return this.http.delete(API_URL + id, { responseType: 'json' });
    }

    clearCart(): Observable<any> {
        return this.http.delete(API_URL + 'cart', { responseType: 'json' });
    }

}