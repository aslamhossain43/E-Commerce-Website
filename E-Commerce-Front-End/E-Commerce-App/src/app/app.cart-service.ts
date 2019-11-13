import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './cart-entities/product';
import { Item } from './cart-entities/item';

@Injectable()
export class ProductServiceForCart {
    private products:Product[];
    items: Item[] = [];
//-----------------------
    constructor(private http: Http) {
this.getAllProducts();
    }




    
     getAllProductsForCart(): Observable<Product[]> {
        return this.http.get('/products/getAllProducts')
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

allItemsFromLocalStorage(){
 
    this.items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity,
        cart1:item.cart1,
        cart2:item.cart2
  
      });
    }
    return this.items;
  
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