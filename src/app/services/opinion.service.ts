import { Opinion, OpinionToSave } from './../models/opinion';
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

  findOpinion(opinionId: number): Observable<Opinion> {
    return this.httpClient.get<Opinion>(this.headerService.getPath() + "/opinion/show/" + opinionId, {headers: this.headerService.getBasicAuthentication()});
  }

  createOpinion(opinion: OpinionToSave): Observable<Opinion> {
    return this.httpClient.post<Opinion>(this.headerService.getPath() + "/opinion/" + opinion.book_id, opinion, {headers: this.headerService.getBasicAuthentication()});
  }

  updateOpinion(opinion: OpinionToSave): Observable<Opinion> {
    return this.httpClient.put<Opinion>(this.headerService.getPath() + "/opinion", opinion, {headers: this.headerService.getBasicAuthentication()});
  }

  delete(opinionId: number): Observable<void> {
    return this.httpClient.delete<void>(this.headerService.getPath() + "/opinion/" + opinionId, {headers: this.headerService.getBasicAuthentication()});
  }
}
