import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class UploadFileService {
  constructor(private http: Http) { }
  pushFileToStorage(photos: FileList) {
    const formdata: FormData = new FormData();
    for (let x = 0; x < photos.length; x++) {
      formdata.append("pFiles", photos[x]);
    }

    return this.http.post('/products/addFiles', formdata);
  }

  pushCarouselFileToStorage(pictures:FileList) {
    const formdata: FormData = new FormData();
    
    
    for (let x = 0; x < pictures.length; x++) {
      formdata.append("cFiles", pictures[x]);
    }


     return this.http.post('/carousel/addCFiles', formdata);
  }

  pushThirdPartyFileToStorage(pictures:FileList) {
    const formdata: FormData = new FormData();
    
    
    for (let x = 0; x < pictures.length; x++) {
      formdata.append("tpFiles", pictures[x]);
    }


     return this.http.post('/thirdParty/addtpFiles', formdata);
  }


  pushgmFileToStorage(picture:File) {
    const formdata: FormData = new FormData();
    
    
      formdata.append("gMFile", picture);
   

     return this.http.post('/contacts/addGMFile', formdata);
  }




}