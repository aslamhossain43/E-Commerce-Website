import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './cart-entities/product';

@Injectable()
export class ProductServiceForCart {
    private products:Product[];
    
//-----------------------
    constructor(private http: Http) {
this.getAllProducts();
        
    }




    
     getAllProductsForCart(): Observable<Product[]> {
        return this.http.get('http://localhost:8080/products/getAllProducts')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }


    getAllProducts(): void {
        this.getAllProductsForCart()
        .subscribe((products) => {
          this.products = products;
        },
        (error) => {
          console.log(error);
        });
          }




findAll(): Product[]{
    return this.products;
}


find(id: string): Product {

    
      return this.products[this.getSelectedIndex(id)];
    }
    
    private getSelectedIndex(id: string) {
    
      for (var i = 0; i < this.products.length; i++) {
          if (this.products[i].id == id) {
              return i;
          }
      }
      return -1;
    }
    
    
    


    public handlError(error: Response) {
        return Observable.throw(error);
    }
}