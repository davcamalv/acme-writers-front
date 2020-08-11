import { Book, BookToSave, BookStatus } from './../models/book';
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

  findBook(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(this.headerService.getPath() + "/book/show/" + bookId, {headers: this.headerService.getBasicAuthentication()});
  }

  createBook(book: BookToSave): Observable<Book> {
    return this.httpClient.post<Book>(this.headerService.getPath() + "/book", book, {headers: this.headerService.getBasicAuthentication()});
  }

  updateBook(book: BookToSave): Observable<Book> {
    return this.httpClient.put<Book>(this.headerService.getPath() + "/book", book, {headers: this.headerService.getBasicAuthentication()});
  }

  addToMyList(bookId: number): Observable<void> {
    return this.httpClient.get<void>(this.headerService.getPath() + "/book/add-to-my-list/" + bookId, {headers: this.headerService.getBasicAuthentication()});
  }

  removeFromMyList(bookId: number): Observable<void> {
    return this.httpClient.delete<void>(this.headerService.getPath() + "/book/remove-from-my-list/" + bookId, {headers: this.headerService.getBasicAuthentication()});
  }

  changeStatus(book: BookStatus): Observable<Book> {
    return this.httpClient.post<Book>(this.headerService.getPath() + "/book/change-status", book, {headers: this.headerService.getBasicAuthentication()});
  }

  listMyRequests(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.headerService.getPath() + "/book/list-my-requests", {headers: this.headerService.getBasicAuthentication()});
  }

  delete(bookId: number): Observable<void> {
    return this.httpClient.delete<void>(this.headerService.getPath() + "/book/delete/" + bookId, {headers: this.headerService.getBasicAuthentication()});
  }
}
