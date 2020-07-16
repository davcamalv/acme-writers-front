import { LoginComponent } from './auth/login/login.component';
import { Component, OnDestroy, OnInit, Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Injectable({providedIn:'root'})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  routes: Object[] = [];

  loading = false;
  title: any = 'acme-writers-front';


  constructor(private router: Router, private dialog: MatDialog) {
    this.router.events.subscribe((event: RouterEvent) =>{
      switch(true){
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
      }
    });

  }

  ngOnInit(): void{
    this.loadMenu();
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

  loadMenu() : void{
    let token = sessionStorage.getItem("loginToken");
    let logged = token != null && token !== "";

  }

  openLogin(): void {
    let dialog = this.dialog.open(LoginComponent, {
      width: '250px'
    });
    dialog.afterClosed().subscribe(()=>{
      let token = sessionStorage.getItem("loginToken");
      if(token != null && token != ""){
        this.loadMenu();
      }
    });
  }

}
