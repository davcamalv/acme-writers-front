import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient, private headerService:HeaderService) { }

  isValidEmail(email : string) : Observable<boolean> {
    let data = {"email": email};
    return this.httpClient.post<boolean>(this.headerService.getPath() + "/user/is-a-valid-email", data);
  }
}
