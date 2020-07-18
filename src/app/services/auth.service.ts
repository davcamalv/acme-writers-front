import { environment } from './../../environments/environment';
import { JwtResponse, UserLog } from './../models/jwt-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({providedIn:'root'})
export class AuthService {
  authSubject = new BehaviorSubject(false);
  private token: string;
  path : string = environment.backend;

  constructor(private httpClient: HttpClient) { }

  login(user: UserLog): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(this.path + "/auth/login", user).pipe(tap(
      (res: JwtResponse)=> {
        if(res){
            this.saveToken(res.token);
        }
      }
    ));
  }

  refreshToken(): void {
    this.httpClient.get(this.path + "auth/refresh", {headers: this.getHeadersToRefresh()}).pipe(tap(
      (res: JwtResponse)=> {
        if(res){
            this.saveToken(res.token);
        }
      }
    ));
  }

  logout(): void {
    this.token = '';
    this.httpClient.get(this.path + "/auth/logout");
    sessionStorage.removeItem("ACCESS_TOKEN");
  }

  private saveToken(token:string): void{
    sessionStorage.setItem("ACCESS_TOKEN", token);
    this.token = token;
  }

  private getHeadersToRefresh(): HttpHeaders{
    let headers = new HttpHeaders();

    headers = headers.append("Authorization", "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"));
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Access-Control-Allow-Origin", '*');

    return headers;
}
}
