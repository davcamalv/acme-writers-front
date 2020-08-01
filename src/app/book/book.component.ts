import { Opinion } from './../models/opinion';
import { OpinionService } from './../services/opinion.service';
import { MatTableDataSource } from '@angular/material/table';
import { Chapter } from './../models/chapter';
import { ChapterService } from './../services/chapter.service';
import { Book } from './../models/book';
import { BookService } from './../services/book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  opinions: Opinion[];
  book: Book;
  bookId: number;
  fallbackImg = 'assets/book_cover.png';
  fallbackImgUser = 'assets/photo_profile.png';
  matDataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['number', 'title', 'buttons'];

  constructor(private router: Router, private route: ActivatedRoute, private bookService: BookService, private chapterService: ChapterService, private opinionService: OpinionService) {
    this.bookId = this.route.snapshot.queryParams['id'];
   }

  ngOnInit(): void {
    this.bookService
    .findBook(this.bookId)
    .subscribe((book: Book) => {
      this.book = book;
    });
    this.chapterService
    .listChaptersOfBook(this.bookId)
    .subscribe((chapters: Chapter[]) => {
      this.matDataSource.data = chapters;
    });
    this.opinionService
    .listOpinionsOfBook(this.bookId)
    .subscribe((opinions: Opinion[]) => {
      this.opinions = opinions;
    });
  }

  publish(bookId: number): void {
    this.bookService.changeDraft(bookId).subscribe(() => {
      this.router.navigate(['listMyBooks']);
    });
}

}
