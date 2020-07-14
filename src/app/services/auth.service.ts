import { HeaderService } from './header.service';
import { JwtResponse } from './../models/jwt-response';
import { Reader } from './../models/reader';
import { User } from './../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthService {
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient, private headerService:HeaderService) { }

  registerReader(reader: Reader): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(this.headerService.getPath() + "/reader", reader).pipe(tap(
      (res: JwtResponse)=> {
        if(res){
          this.saveToken(res.token);
        }
      }
    ));
  }

  login(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(this.headerService.getPath() + "/auth/login", user).pipe(tap(
      (res: JwtResponse)=> {
        if(res){
            this.saveToken(res.token);
        }
      }
    ));
  }

  refreshToken(): void {
    this.httpClient.get(this.headerService.getPath() + "auth/refresh", {headers: this.getHeadersToRefresh()}).pipe(tap(
      (res: JwtResponse)=> {
        if(res){
            this.saveToken(res.token);
        }
      }
    ));
  }

  logout(): void {
    this.token = '';
    this.httpClient.get(this.headerService.getPath() +"/auth/logout");
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
