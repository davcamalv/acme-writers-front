import { Publisher, BasicPublisher } from './../models/publisher';
import { tap } from 'rxjs/operators';
import { JwtResponse } from './../models/jwt-response';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private httpClient:HttpClient, private headerService:HeaderService) { }

  register(publisher : Publisher) : Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(this.headerService.getPath() + "/publisher", publisher).pipe(tap(
      (res: JwtResponse)=> {
        if(res){
          sessionStorage.setItem("ACCESS_TOKEN", res.token);
        }
      }
    ));
  }

  listAllPublishers(): Observable<BasicPublisher[]> {
    return this.httpClient.get<BasicPublisher[]>(this.headerService.getPath() + "/publisher/list-all-publishers", {headers: this.headerService.getBasicAuthentication()});
  }
}
