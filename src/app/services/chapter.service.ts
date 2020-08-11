import { Chapter, ChapterToSave } from './../models/chapter';
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

  createChapter(chapter: ChapterToSave): Observable<Chapter> {
    return this.httpClient.post<Chapter>(this.headerService.getPath() + "/chapter/" + chapter.book_id, chapter, {headers: this.headerService.getBasicAuthentication()});
  }

  updateChapter(chapter: ChapterToSave): Observable<Chapter> {
    return this.httpClient.put<Chapter>(this.headerService.getPath() + "/chapter", chapter, {headers: this.headerService.getBasicAuthentication()});
  }

  delete(chapterId: number): Observable<void> {
    return this.httpClient.delete<void>(this.headerService.getPath() + "/chapter/" + chapterId, {headers: this.headerService.getBasicAuthentication()});
  }
}
