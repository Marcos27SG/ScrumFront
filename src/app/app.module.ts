import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule , Route} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { RegistryComponent } from './components/registry/registry.component';


const routes: Route[]  = [
  {path : '' , component: RegistryComponent} ,
  {path : 'room/:idRoom/:idUser' , component: UserComponent} ,
  
]
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistryComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule , 
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
