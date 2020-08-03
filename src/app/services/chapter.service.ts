import { Chapter } from './../models/chapter';
import { Book } from './../models/book';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private httpClient:HttpClient, private headerService:HeaderService){}

  listChaptersOfBook(bookId: number): Observable<Chapter[]> {
      return this.httpClient.get<Chapter[]>(this.headerService.getPath() + "/chapter/chapters-of-book/" + bookId, {headers: this.headerService.getBasicAuthentication()});
  }

  findChapter(chapterId: number): Observable<Chapter> {
    return this.httpClient.get<Chapter>(this.headerService.getPath() + "/chapter/show/" + chapterId, {headers: this.headerService.getBasicAuthentication()});
  }
}
