import { NgModule } from '@angular/core';
import { Routes, RouterModule, Params } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { AddnewComponent } from './addnew/addnew.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: 'edit/:id',component: UpdateComponent },
  { path: 'home',component: HomeComponent },
  { path: 'new',component: AddnewComponent },
  { path: 'details/:id',component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
