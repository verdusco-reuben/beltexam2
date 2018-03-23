import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {

  errors: any;
  constructor(
    private _httpService : HttpService,
    private _router : Router,) { }
  newpet = { name: "", type: "", description: "",
            skills_1: "", skills_2: "", skills_3: ""}
  ngOnInit() {
  }

  newPetForm(){
    var observable = this._httpService.createOne(this.newpet);
    observable.subscribe(data => {
      if(data['error']){
        console.log(data['error'])
        this.errors = [];
        if(data['error']['errors']['description']){
          this.errors.push(data['error']['errors']['description']['message']);
        }
        if(data['error']['errors']['name']){
          this.errors.push(data['error']['errors']['name']['message']);
        }
        if(data['error']['errors']['type']){
          this.errors.push(data['error']['errors']['type']['message']);
        }
        var test = this._httpService.getByName(this.newpet.name);
        test.subscribe(data =>{
          if(data['name']){
            this.errors.push("ALREADY GOT THAT NAME, SORRY")
          }
        })
      }else{
      this._router.navigate(['home'])
      }
    })
  }

}
