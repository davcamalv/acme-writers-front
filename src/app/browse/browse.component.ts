import { Book } from './../models/book';
import { BookService } from './../services/book.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  newBooks: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService
    .listNewBooks()
    .subscribe((books: Book[]) => {
     this.newBooks = books;
     this.initCarousel();
    });
  }

  @ViewChild('OwlElement') OwlElement: OwlCarousel
  initCarousel(){
    this.OwlElement.reInit();
  }
  fallbackImg = 'assets/book_cover.png';

  mySlideOptions={items: 5, dots: true, rewind: true, autoplay:true, dotsEach: 1};


}
