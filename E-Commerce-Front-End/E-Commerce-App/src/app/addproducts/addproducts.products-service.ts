import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product';
@Injectable()
export class ProductService {

    constructor(private http: Http) { }

    addProduct(product: Product) {
        const body = JSON.stringify(product);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        if (product.id) {
            return this.http.put('http://localhost:8080/products/updateProduct/' + product.id, body, options);
        } else {
            return this.http.post('http://localhost:8080/products/addProduct', body, options);
        }
    }

    getAllProducts(): Observable<Product[]> {
        return this.http.get('http://localhost:8080/products/getAllProducts')
        .pipe(map((response: Response) => response.json(),
        (error) => {
         catchError(this.handlError);
        }));
    }


public handlError(error: Response) {
    return Observable.throw(error);
}






}