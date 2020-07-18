import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn:'root'})

export class HeaderService {
    path : string = environment.backend;

    constructor(private authService:AuthService){
    }

    getPath():string{
      return this.path;
    }

    getBasicAuthentication(): HttpHeaders{
        let headers = new HttpHeaders();
        if(this.isTokenExpired()){
          this.authService.refreshToken();
        }
        headers = headers.append("Authorization", "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"));
        headers = headers.append("Content-Type", "application/json");
        headers = headers.append("Access-Control-Allow-Origin", '*');

        return headers;
    }

    private isTokenExpired(): boolean{
      let res: boolean = false;
      let token = sessionStorage.getItem("ACCESS_TOKEN");
      if(token != null){
        let decodedToken = jwt_decode(token);
        let expirationDate = new Date(decodedToken["exp"] * 1000);
        if(new Date() > expirationDate){
          res = true;
        }
      }
      return res;
    }
  }
