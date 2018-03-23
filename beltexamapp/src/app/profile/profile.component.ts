import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  already_clicked = false;
  id: any;
  singlepet: any;
  constructor(
    private _route : ActivatedRoute,
    private _router : Router,
    private _HttpService : HttpService
  ) { }

  ngOnInit() {
    this.populatePage();
  }
  populatePage(){
    //get id from parameters
    this._route.params.subscribe(data => {
      console.log(data);
      this.id = data['id'];
    })
    //get user from Http.Service
    var observable = this._HttpService.getOne(this.id);
    observable.subscribe(data => {
      this.singlepet = data;
      console.log("got my singlepet!", this.singlepet)
    })
  }
  likeThisPet(id){
    var observable = this._HttpService.likeOne(this.id);
    observable.subscribe(data => {
      this.singlepet = data;
      console.log("liked my singlepet!", this.singlepet);
      this.already_clicked = true;
      this.populatePage();
    })
  }
  adoptMe(id){
    var observable = this._HttpService.deleteOne(id);
    observable.subscribe(data => {
      console.log(data);
      this._router.navigate(['/home']);
    })
  }
}
