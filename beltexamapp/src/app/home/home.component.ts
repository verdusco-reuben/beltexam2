import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dogpic = "https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg"
  all_pets : any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    var observable = this._httpService.getAll();
    observable.subscribe(data => {
      console.log(data);
      this.all_pets = this.sort(data);
      console.log(this.all_pets)
    })
  }
  sort(data){
    for(var x= 0; x< data.length-1; x++){
      for(var i = 0; i< data.length-1; i++){
        if(data[x].type[0] <data[i].type[0]){
          var temp= data[x];
          data[x]= data[i];
          data[i] = temp;
        }
      }
    }
    for(var i = 0; i< data.length-1; i++){
      if(data[x].type[0] <data[i].type[0]){
        var temp= data[x];
        data[x]= data[i];
        data[i] = temp;
      }
    }
    return data;
  }
}
