import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: any;
  pet: any;
  errors: any;
  constructor(
    private _route: ActivatedRoute,
    private _HttpService : HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.populateForm();
  }
  populateForm(){
    //get id from parameters
    this._route.params.subscribe(data => {
      console.log(data);
      this.id = data['id'];
    })
    //get user from Http.Service
    var observable = this._HttpService.getOne(this.id);
    observable.subscribe(data => {
      this.pet = data;
      console.log("got my pet!", this.pet)
    })
  }
  submitEdits(){
    var observable = this._HttpService.editOne(this.pet)
    observable.subscribe(data => {
      if(data['error']){
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
        var test = this._HttpService.getByName(this.pet.name);
        test.subscribe(data =>{
          if(data['name']){
            this.errors.push("ALREADY GOT THAT NAME, SORRY")
          }
        })
        console.log(this.errors)
      }else{
      this._router.navigate(['/home']);
      }
    })
  }
  
}
