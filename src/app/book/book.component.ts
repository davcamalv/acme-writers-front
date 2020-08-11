import { SaveOpinionComponent } from './../save-opinion/save-opinion.component';
import { SaveBookComponent } from './../save-book/save-book.component';
import { MatDialog } from '@angular/material/dialog';
import { Opinion } from './../models/opinion';
import { OpinionService } from './../services/opinion.service';
import { MatTableDataSource } from '@angular/material/table';
import { Chapter } from './../models/chapter';
import { ChapterService } from './../services/chapter.service';
import { Book, BookStatus } from './../models/book';
import { BookService } from './../services/book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  opinions: Opinion[];
  chapters: Chapter[];
  book: Book;
  bookId: number;
  fallbackImg = 'assets/book_cover.png';
  fallbackImgUser = 'assets/photo_profile.png';
  matDataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['number', 'title', 'buttons'];
  tokenDecoded = jwt_decode(sessionStorage.getItem("ACCESS_TOKEN"));
  roles = this.tokenDecoded["roles"];
  userId = this.tokenDecoded["sub"];
  bookStatus: BookStatus;

  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private bookService: BookService, private chapterService: ChapterService, private opinionService: OpinionService) {
    this.bookId = this.route.snapshot.queryParams['id'];
   }

   navigateTo(route: string, method?: string, id?: number): void{
    if(method==undefined && id == undefined){
      this.router.navigate([route]);
    }else if(method != undefined && id == undefined){
      this.router.navigate([route], {queryParams:{method: method}});
    }else if(method == undefined && id != undefined){
      this.router.navigate([route], {queryParams:{id: id}});
    }else if(method != undefined && id != undefined){
      this.router.navigate([route], {queryParams:{method: method, id: id}});
    }
  }

  ngOnInit(): void {
    this.bookService
    .findBook(this.bookId)
    .subscribe((book: Book) => {
      this.book = book;
      if(!book.draft){
        this.opinionService
        .listOpinionsOfBook(this.bookId)
        .subscribe((opinions: Opinion[]) => {
          this.opinions = opinions;
        });
      }
    });
    this.chapterService
    .listChaptersOfBook(this.bookId)
    .subscribe((chapters: Chapter[]) => {
      this.chapters = chapters;
      this.matDataSource.data = chapters;
    });

  }

  deleteBook(bookId: number): void {
    this.bookService.delete(bookId).subscribe(() => {
      this.router.navigate(['listMyBooks']);
    });
  }

  deleteChapter(chapterId: number): void {
    this.chapterService.delete(chapterId).subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteOpinion(opinionId: number): void {
    this.opinionService.delete(opinionId).subscribe(() => {
      this.ngOnInit();
    });
  }

  publish(bookId: number): void {
    this.bookService.changeDraft(bookId).subscribe(() => {
      this.router.navigate(['listMyBooks']);
    });
  }

  accept(bookId: number): void {
    this.bookStatus = {
      book_id: bookId,
      status: 'ACCEPTED'
    };
    this.bookService.changeStatus(this.bookStatus).subscribe(() => {
      this.router.navigate(['listMyBooks']);
    });
  }

  reject(bookId: number): void {
    this.bookStatus = {
      book_id: bookId,
      status: 'REJECTED'
    };
    this.bookService.changeStatus(this.bookStatus).subscribe(() => {
      this.router.navigate(['listMyBooks']);
    });
  }

  addToList(bookId: number): void {
    this.bookService.addToMyList(bookId).subscribe(() => {
      this.router.navigate(['listMyBooks']);
    });
  }

  removeFromList(bookId: number): void {
    this.bookService.removeFromMyList(bookId).subscribe(() => {
      this.router.navigate(['listMyBooks']);
    });
  }

  createChapter(){
    this.router.navigate(['saveChapter'], {queryParams:{bookId: this.bookId, id: 0}});
  }

  createOpinion(){
    let dialog = this.dialog.open(SaveOpinionComponent, {
      width: '350px',
      data: {
        id: 0,
        userId: this.userId,
        bookId: this.bookId
      }
    });
    dialog.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }

  updateOpinion(opinionId: number){
    let dialog = this.dialog.open(SaveOpinionComponent, {
      width: '350px',
      data: {
        id: opinionId,
        userId: this.userId,
        bookId: this.bookId
      }
    });
    dialog.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }

  updateBook(bookId: number){
    let dialog = this.dialog.open(SaveBookComponent, {
      width: '350px',
      data: {
        id: bookId
      }
    });
    dialog.afterClosed().subscribe(()=>{
      this.ngOnInit();
    });
  }
}
