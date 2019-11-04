import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product';
import { Category } from './category';
import { Carousel } from './carousel';
import { EmailSending } from './manage.email';
import { PersonAndProductsCombinedForCheckOut } from './checkout';
@Injectable()
export class ProductService {
    constructor(private http: Http) {




     }

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



    getAllCarousel(): Observable<Carousel[]> {
        return this.http.get('http://localhost:8080/carousel/getAllCarousel')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }


    addCategory(category: Category) {
        const body = JSON.stringify(category);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        if (category.id) {
            return this.http.put('/categories/update/' + category.id, body, options);
        } else {
            return this.http.post(`http://localhost:8080/categories/addCategory`, body, options);
        }
    }

    addCheckout(personAndProductsCombinedForCheckOut:PersonAndProductsCombinedForCheckOut) {
        const body = JSON.stringify(personAndProductsCombinedForCheckOut);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(`http://localhost:8080/checkout/addCheckout`, body, options);
       
    }

    getAllCheckout(): Observable<PersonAndProductsCombinedForCheckOut[]> {
        return this.http.get('http://localhost:8080/checkout/getAllCheckout')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }





    emailSending(emailSending:EmailSending) {
        const body = JSON.stringify(emailSending);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
       
            return this.http.post(`http://localhost:8080/email/send`, body, options);
       
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get('http://localhost:8080/categories/getAllCategories')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }


    getProductById(id: string): Observable<Product> {
        return this.http.get('http://localhost:8080/products/getProductById/' + id)
            .pipe(map((response: Response) => response.json(),
                catchError(this.handlError)
            ));
    }



    getProductsByIdForSameCategoryAndBrand(id: string): Observable<Product[]> {
        return this.http.get('http://localhost:8080/products/getProductsByIdForSameCategory/' + id)
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }


    getProductsCategoryNoDuplicate(): Observable<string[]> {
        return this.http.get('http://localhost:8080/products/getProductsCategoryNoDuplicate')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }
    getProductsBrandNoDuplicate(): Observable<string[]> {
        return this.http.get('http://localhost:8080/products/getProductsBrandNoDuplicate')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }

    getProductsColorNoDuplicate(): Observable<string[]> {
        return this.http.get('http://localhost:8080/products/getProductsColorNoDuplicate')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }
    getProductsNameNoDuplicate(): Observable<string[]> {
        return this.http.get('http://localhost:8080/products/getProductsNamesNoDuplicate')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }



    getProductsByCategory(category:string): Observable<Product[]> {
        return this.http.get('http://localhost:8080/products/getProductsByCategory/'+category)
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }

    getProductsByBrand(brand:string): Observable<Product[]> {
        return this.http.get('http://localhost:8080/products/getProductsByBrand/'+brand)
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }



    public handlError(error: Response) {
        return Observable.throw(error);
    }






}