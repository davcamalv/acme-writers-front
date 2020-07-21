import { tap } from 'rxjs/operators';
import { JwtResponse } from './../models/jwt-response';
import { Reader } from './../models/reader';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private httpClient:HttpClient, private headerService:HeaderService) { }

  register(reader : Reader) : Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(this.headerService.getPath() + "/reader", reader).pipe(tap(
      (res: JwtResponse)=> {
        if(res){
          sessionStorage.setItem("ACCESS_TOKEN", res.token);
        }
      }
    ));
  }
}
