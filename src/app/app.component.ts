import { AuthService } from './services/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { Component, OnDestroy, OnInit, Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as jwt_decode from 'jwt-decode';
import { RegisterComponent } from './auth/register/register.component';


@Injectable({providedIn:'root'})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  roles: string[] = [];
  routes: Object[] = [];

  constructor(private router: Router, private dialog: MatDialog, private authService: AuthService) {

  }

  ngOnInit(): void{
    let token = sessionStorage.getItem("ACCESS_TOKEN");
    if(token != null && token !== ""){
      this.redirectUser();
    }else{
      this.roles =undefined;
      this.navigateTo("welcome");
    }
  }


  ngOnDestroy(): void {

  }

  navigateTo(route: string, method?: string, id?: number): void{
    if(method==undefined && id == undefined){
      this.router.navigate([route]);
    }else if(method != undefined && id == undefined){
      this.router.navigate([route], {queryParams:{method: method}});
    }else if(method == undefined && id != undefined){
      this.router.navigate([route], {queryParams:{id: id}});
    }else if(method != undefined && id != undefined){
      this.router.navigate([route], {queryParams:{method: method, id: id}});
    }
  }

  openLogin(): void {
    let dialog = this.dialog.open(LoginComponent, {
      width: '250px',
    });
    dialog.afterClosed().subscribe(()=>{
      let token = sessionStorage.getItem("ACCESS_TOKEN");
      if(token != null && token != ""){
        this.redirectUser();
      }
    });
  }

  register(rol: string): void {
    let dialog = this.dialog.open(RegisterComponent, {
      width: '350px',
      data: {
        rol: rol
      }
    });
    dialog.afterClosed().subscribe(()=>{
      let token = sessionStorage.getItem("ACCESS_TOKEN");
      if(token != null && token != ""){
        this.redirectUser();
      }
    });
  }

  logout(): void{
    this.authService.logout();
    this.roles = undefined;
    this.navigateTo("welcome");
  }

  redirectUser(){
        this.roles = jwt_decode(sessionStorage.getItem("ACCESS_TOKEN"))["roles"];

        if (this.roles.includes("writer")){
          this.navigateTo("writer");
        }else if(this.roles.includes("publisher")){
          this.navigateTo("publisher");
        }else if(this.roles.includes("reader")){
          this.navigateTo("reader");
        }
  }

}
