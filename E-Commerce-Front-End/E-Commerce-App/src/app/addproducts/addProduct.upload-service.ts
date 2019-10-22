import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class UploadFileService {
  constructor(private http: Http) { }
  pushFileToStorage(piFile: File) {
    const formdata: FormData = new FormData();
    formdata.append('piFile', piFile);
     return this.http.post('/products/addFile', formdata);
  }

}