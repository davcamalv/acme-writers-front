import { Chapter, ChapterToSave } from './../models/chapter';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService } from './../services/chapter.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-chapter',
  templateUrl: './save-chapter.component.html',
  styleUrls: ['./save-chapter.component.css']
})
export class SaveChapterComponent implements OnInit {

  disabled: boolean;
  title = new FormControl('', { validators: [Validators.required] });
  number = new FormControl('', { validators: [Validators.required] });
  text = new FormControl('', { validators: [Validators.required] });
  chapterId: number;
  bookId: number;
  chapter: ChapterToSave;
  constructor(private router: Router, private route: ActivatedRoute, private chapterService: ChapterService) {
    this.chapterId = this.route.snapshot.queryParams['id'];
  }

  ngOnInit(): void {
    if (this.chapterId > 0) {
      this.chapterService.findChapter(this.chapterId).subscribe((chapter: Chapter) => {
        this.title.setValue(chapter.title);
        this.number.setValue(chapter.number);
        this.text.setValue(chapter.text);
        this.bookId = chapter.book.id;
      })
    }else{
      this.bookId = this.route.snapshot.queryParams['bookId'];
    }
  }



  save(): void {
    if (this.validForm()) {
      this.disabled = true;
      if (this.chapterId > 0) {
        this.chapter = {
          chapter_id: this.chapterId,
          title: this.title.value,
          number: this.number.value,
          text: this.text.value,
          book_id: this.bookId
        };

        this.chapterService.updateChapter(this.chapter).subscribe((chapter: Chapter) => {
          this.router.navigate(['showChapter'], {queryParams:{id: chapter.id}});
        },
          (error) => {
            this.disabled = false;
          });
      } else {
        this.chapter = {
          chapter_id: 0,
          title: this.title.value,
          number: this.number.value,
          text: this.text.value,
          book_id: this.bookId
        };
        this.chapterService.createChapter(this.chapter).subscribe((chapter: Chapter) => {
          this.router.navigate(['showChapter'], {queryParams:{id: chapter.id}});
        },
        (error) => {
          this.disabled = false;
         });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['showBook'], {queryParams:{id: this.bookId}});
  }

  validForm(): boolean{
    let valid: boolean = true;

      valid = valid && this.title.valid;
      valid = valid && this.number.valid;
      valid = valid && this.text.valid;

    return valid
  }

  abled(): boolean{
    if(this.disabled){
      return true;
    }else{
      return !this.validForm();
    }
  }

  getErrorMessageTitle(): string{
    return this.title.hasError('required')? "You must enter a title":"";
  }

  getErrorMessageNumber(): string{
    return this.number.hasError('required')? "You must enter a number":"";
  }

  getErrorMessageText(): string{
    return this.text.hasError('required')? "You must enter a text":"";
  }


}
