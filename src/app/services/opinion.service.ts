import { Opinion } from './../models/opinion';
import { Chapter } from './../models/chapter';
import { Book } from './../models/book';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  constructor(private httpClient:HttpClient, private headerService:HeaderService){}

  listOpinionsOfBook(bookId: number): Observable<Opinion[]> {
      return this.httpClient.get<Opinion[]>(this.headerService.getPath() + "/opinion/opinions-of-book/" + bookId, {headers: this.headerService.getBasicAuthentication()});
  }
}
