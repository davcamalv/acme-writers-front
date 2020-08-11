import { Writer } from './../models/writer';
import { tap } from 'rxjs/operators';
import { JwtResponse } from './../models/jwt-response';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WriterService {

  constructor(private httpClient:HttpClient, private headerService:HeaderService) { }

  register(writer: Writer) : Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(this.headerService.getPath() + "/writer", writer).pipe(tap(
      (res: JwtResponse)=> {
        if(res){
          sessionStorage.setItem("ACCESS_TOKEN", res.token);
        }
      }
    ));
  }
}
