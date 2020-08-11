import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Book, BookStatus } from './../models/book';
import { BookService } from './../services/book.service';
import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, transition, style, animate } from '@angular/animations';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListRequestsComponent implements OnInit {

  matDataSource = new MatTableDataSource([]);
  fallbackImg = 'assets/book_cover.png';
  displayedColumns: string[] = ['identifier','title','language', 'writer'];
  expandedElement: Book | null;
  empty: Boolean = false;
  tokenDecoded = jwt_decode(sessionStorage.getItem("ACCESS_TOKEN"));
  roles = this.tokenDecoded["roles"];
  bookStatus: BookStatus;

  constructor(private router: Router, private bookService: BookService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.bookService
    .listMyRequests()
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
}
