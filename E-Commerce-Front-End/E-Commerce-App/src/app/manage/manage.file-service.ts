import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class UploadFileService {
  constructor(private http: Http) { }
  pushFileToStorage(pFile: File) {
    const formdata: FormData = new FormData();
    formdata.append('pFile', pFile);
    console.log('from upload service')
     return this.http.post('http://localhost:8080/products/addFile', formdata);
  }

  pushCarouselFileToStorage(pictures:FileList) {
    const formdata: FormData = new FormData();
    
    
    for (let x = 0; x < pictures.length; x++) {
      formdata.append("cFiles", pictures[x]);
    }


     return this.http.post('http://localhost:8080/carousel/addCFiles', formdata);
  }






}