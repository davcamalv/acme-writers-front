import { SaveBookComponent } from './../save-book/save-book.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Book } from './../models/book';
import { BookService } from './../services/book.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, transition, style, animate } from '@angular/animations';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListBooksComponent implements OnInit {
  matDataSource = new MatTableDataSource([]);
  fallbackImg = 'assets/book_cover.png';
  displayedColumns: string[] = ['identifier','title', 'publisher', 'language', 'writer'];
  displayedColumnsWriter: string[] = ['identifier','title', 'publisher', 'language', 'mode'];
  expandedElement: Book | null;
  empty: Boolean = false;
  tokenDecoded = jwt_decode(sessionStorage.getItem("ACCESS_TOKEN"));
  roles = this.tokenDecoded["roles"];

  constructor(private router: Router, private bookService: BookService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.bookService
    .listMyBooks()
    .subscribe((books: Book[]) => {
      this.matDataSource.data = books;
      if(books.length === 0){
        this.empty = true;
      }
    });
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

  publish(bookId: number): void {
      this.bookService.changeDraft(bookId).subscribe(() => {
        this.bookService
        .listMyBooks()
        .subscribe((books: Book[]) => {
          this.matDataSource.data = books;
          if(books.length === 0){
            this.empty = true;
          }
        });
      });
  }

  deleteBook(bookId: number): void {
    this.bookService.delete(bookId).subscribe(() => {
      this.bookService
      .listMyBooks()
      .subscribe((books: Book[]) => {
        this.matDataSource.data = books;
        if(books.length === 0){
          this.empty = true;
        }
      });
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

  removeFromList(bookId: number): void {
    this.bookService.removeFromMyList(bookId).subscribe(() => {
      this.ngOnInit();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matDataSource.filter = filterValue.trim().toLowerCase();
  }
}
