import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get("/all");
  }
  createOne(pet){
    return this._http.post('/pet', pet);
  }
  editOne(pet){
    return this._http.put('/pet/'+pet._id, pet)
  }
  deleteOne(id){
    return this._http.delete('/pet/'+id)
  }
  getOne(id){
    return this._http.get("/pet/"+id);
  }
  likeOne(id){
    return this._http.get("/like/"+id);
  }
  getByName(name){
    console.log(name)
    return this._http.get("/name/"+name);
  }
}
