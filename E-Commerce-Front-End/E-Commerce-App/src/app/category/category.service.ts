import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Category } from './category';
@Injectable()
export class CategoryService {

    constructor(private http: Http) { }

    addCategory(category: Category) {
        const body = JSON.stringify(category);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        if (category.id) {
            return this.http.put('/categories/update/' + category.id, body, options);
        } else {
            return this.http.post('/categories/addcategory', body, options);
        }
    }




public handlError(error: Response) {
    return Observable.throw(error);
}






}