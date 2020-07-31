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

  listMyBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.headerService.getPath() + "/book/list-my-books", {headers: this.headerService.getBasicAuthentication()});
  }

  changeDraft(bookId: number): Observable<void> {
    return this.httpClient.get<void>(this.headerService.getPath() + "/book/change-draft/" + bookId, {headers: this.headerService.getBasicAuthentication()});
  }

}
