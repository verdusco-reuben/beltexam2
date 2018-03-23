import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { HomeComponent } from './home/home.component';
import { AddnewComponent } from './addnew/addnew.component';
import { UpdateComponent } from './update/update.component';
import { ProfileComponent } from './profile/profile.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddnewComponent,
    UpdateComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
