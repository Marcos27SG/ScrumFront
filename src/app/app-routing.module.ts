import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path : 'home' , component: AppComponent} ,
  {path : 'room' , component: UserComponent} ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
