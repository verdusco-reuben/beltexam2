import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router){}

    ngOnInit() {
          this._route.params.subscribe((params: Params) => console.log(params['id']));
    }
    goHome() {
      this._router.navigate(['/home']);
    }



}
