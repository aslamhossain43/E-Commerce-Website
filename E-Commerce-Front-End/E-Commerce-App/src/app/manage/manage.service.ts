import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product';
import { Category } from './category';
import { Carousel } from './carousel';
import { EmailSending } from './manage.email';
import { PersonAndProductsCombinedForCheckOut } from './checkout';
import { Fb } from './fb';
import { Twitter } from './twitter';
import { ThirdPartyProduct } from './thirdparty-product';
import { Phone } from './phone';
import { Email } from './email';
import { GoogleMap } from './googlemap';
import { PaymentPhoneNumber } from './payment-number';
@Injectable()
export class ProductService {
    constructor(private http: Http) {




     }

    addProduct(product: Product) {
        const body = JSON.stringify(product);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
            return this.http.post('/products/addProduct', body, options);
       
    }


    addThirdPartyProduct(tpProduct: ThirdPartyProduct) {
        const body = JSON.stringify(tpProduct);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
            return this.http.post('/thirdParty/addThirdPartyProduct', body, options);
       
    }

    getAllProducts(): Observable<Product[]> {
        return this.http.get('/products/getAllProducts')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }

    getAllThirdPartyProducts(): Observable<ThirdPartyProduct[]> {
        return this.http.get('/thirdParty/getAllThirdPartyProducts')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }



    getAllCarousel(): Observable<Carousel[]> {
        return this.http.get('/carousel/getAllCarousel')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }


    addCategory(category: Category) {
        const body = JSON.stringify(category);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
            return this.http.post(`/categories/addCategory`, body, options);
       
    }



    addFb(fb:Fb) {
        const body = JSON.stringify(fb);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(`/link/addFb`, body, options);
        
    }

    addTwitter(twitter:Twitter) {
        const body = JSON.stringify(twitter);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(`/link/addTwitter`, body, options);
        
    }






    addPhone(phone:Phone) {
        const body = JSON.stringify(phone);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(`/contacts/addPhone`, body, options);
        
    }

    addPaymentPhoneNumber(paymentPhoneNumber:PaymentPhoneNumber) {
        const body = JSON.stringify(paymentPhoneNumber);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(`/contacts/addPaymentPhoneNumber`, body, options);
        
    }


    addEmail(email:Email) {
        const body = JSON.stringify(email);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(`/contacts/addEmail`, body, options);
        
    }











    addCheckout(personAndProductsCombinedForCheckOut:PersonAndProductsCombinedForCheckOut) {
        const body = JSON.stringify(personAndProductsCombinedForCheckOut);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(`/checkout/addCheckout`, body, options);
       
    }

    deleteOrder(id: string) {
        return this.http.delete(`/checkout/delete/` + id);
        }
        deleteCategory(id:string){
            return this.http.delete(`/categories/delete/`+id);
        }

    getAllCheckout(): Observable<PersonAndProductsCombinedForCheckOut[]> {
        return this.http.get('/checkout/getAllCheckout')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }






    getAllPhones(): Observable<Phone[]> {
        return this.http.get('/contacts/getAllPhones')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }

    getAllPaymentPhoneNumbers(): Observable<PaymentPhoneNumber[]> {
        return this.http.get('/contacts/getAllPaymentPhoneNumbers')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }


    getAllEmails(): Observable<Email[]> {
        return this.http.get('/contacts/getAllEmails')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }






    emailSending(emailSending:EmailSending) {
        const body = JSON.stringify(emailSending);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
       
            return this.http.post(`/email/send`, body, options);
       
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get('/categories/getAllCategories')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }


    getProductById(id: string): Observable<Product> {
        return this.http.get('/products/getProductById/' + id)
            .pipe(map((response: Response) => response.json(),
                catchError(this.handlError)
            ));
    }

    getThirdPartyProductById(id: string): Observable<ThirdPartyProduct> {
        return this.http.get('/thirdParty/getThirdPartyProductById/' + id)
            .pipe(map((response: Response) => response.json(),
                catchError(this.handlError)
            ));
    }


    getGmPhoto(): Observable<GoogleMap> {
        return this.http.get(`/contacts/getGMPhoto`)
            .pipe(map((response: Response) => response.json(),
                catchError(this.handlError)
            ));
    }



    deleteProductById(id: string){
        return this.http.delete('/products/delete/' + id);
          
    }

    deleteThirdPartyProductById(id: string){
        return this.http.delete('/thirdParty/delete/' + id);
          
    }


    deletePhoneById(id: string){
        return this.http.delete('/contacts/delete/phone/' + id);
          
    }


    deleteEmailById(id: string){
        return this.http.delete('/contacts/delete/email/' + id);
          
    }





    getFb(): Observable<Fb> {
        return this.http.get('/link/getFb')
            .pipe(map((response: Response) => response.json(),
                catchError(this.handlError)
            ));
    }

    getTwitter(): Observable<Twitter> {
        return this.http.get('/link/getTwitter')
            .pipe(map((response: Response) => response.json(),
                catchError(this.handlError)
            ));
    }



    getProductsByIdForSameCategoryAndBrand(id: string): Observable<Product[]> {
        return this.http.get('/products/getProductsByIdForSameCategory/' + id)
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }


    getProductsCategoryNoDuplicate(): Observable<string[]> {
        return this.http.get('/products/getProductsCategoryNoDuplicate')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }
    getProductsBrandNoDuplicate(): Observable<string[]> {
        return this.http.get('/products/getProductsBrandNoDuplicate')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }

    getProductsColorNoDuplicate(): Observable<string[]> {
        return this.http.get('/products/getProductsColorNoDuplicate')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }
    getProductsNameNoDuplicate(): Observable<string[]> {
        return this.http.get('/products/getProductsNamesNoDuplicate')
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }



    getProductsByCategory(category:string): Observable<Product[]> {
        return this.http.get('/products/getProductsByCategory/'+category)
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }

    getProductsByBrand(brand:string): Observable<Product[]> {
        return this.http.get('/products/getProductsByBrand/'+brand)
            .pipe(map((response: Response) => response.json(),
                (error) => {
                    catchError(this.handlError);
                }));
    }



    public handlError(error: Response) {
        return Observable.throw(error);
    }






}