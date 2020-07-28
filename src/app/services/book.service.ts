import { Book } from './../models/book';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient:HttpClient, private headerService:HeaderService){}

  listNewBooks(): Observable<Book[]> {
      return this.httpClient.get<Book[]>(this.headerService.getPath() + "/book/list-new-books", {headers: this.headerService.getBasicAuthentication()});
  }
}
