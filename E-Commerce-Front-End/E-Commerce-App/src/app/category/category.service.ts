import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Category } from './category';
import { map, catchError } from 'rxjs/operators';
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
            return this.http.post(`http://localhost:8080/categories/addCategory`, body, options);
        }
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get('http://localhost:8080/categories/getAllCategories')
        .pipe(map((response: Response) => response.json(),
        (error) => {
         catchError(this.handlError);
        }));
    }


public handlError(error: Response) {
    return Observable.throw(error);
}






}