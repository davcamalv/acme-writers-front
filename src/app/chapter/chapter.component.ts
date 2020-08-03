import { SaveBookComponent } from './../save-book/save-book.component';
import { MatDialog } from '@angular/material/dialog';
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
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  chapter: Chapter;
  chapterId: number;
  matDataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['number', 'title', 'buttons'];
  constructor(private router: Router, private route: ActivatedRoute, private chapterService: ChapterService, private dialog: MatDialog) {
    this.chapterId = this.route.snapshot.queryParams['id'];
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

  updateChapter(bookId: number){
    let dialog = this.dialog.open(SaveBookComponent, {
      width: '350px',
      data: {
        id: bookId
      }
    });
    dialog.afterClosed().subscribe(()=>{
      this.navigateTo('listMyBooks');
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.chapterService
    .findChapter(this.chapterId)
    .subscribe((chapter: Chapter) => {
      this.chapter = chapter;
      this.chapterService
      .listChaptersOfBook(this.chapter.book.id)
      .subscribe((chapters: Chapter[]) => {
        this.matDataSource.data = chapters;
      });
    });
  }
}
