import { Book, BookToSave } from './../models/book';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from './../services/book.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-book',
  templateUrl: './save-book.component.html',
  styleUrls: ['./save-book.component.css']
})
export class SaveBookComponent implements OnInit {

  disabled: boolean;
  title = new FormControl('', { validators: [Validators.required] });
  description = new FormControl('', { validators: [Validators.required] });
  language = new FormControl('', { validators: [Validators.required] });
  cover = new FormControl('');
  genre = new FormControl('', { validators: [Validators.required] });
  publisher = new FormControl('');
  languages = ['EN', 'ES', 'IT', 'FR', 'DE', 'OTHER'];
  genres = ['FANTASY', 'TERROR', 'ADVENTURE', 'BIOGRAPHICAL', 'SCIENCE FICTION', 'CRIME', 'ROMANCE', 'MYSTERY', 'OTHER']
  bookId: number;
  book: BookToSave;

  constructor(public dialogRef: MatDialogRef<SaveBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private bookService: BookService, private router:Router) { }

  ngOnInit(): void {
    this.bookId = this.data.id;
    if (this.bookId > 0) {
      this.bookService.findBook(this.bookId).subscribe((book: Book) => {
        this.title.setValue(book.title);
        this.description.setValue(book.description);
        this.language.setValue(book.language);
        this.cover.setValue(book.cover);
        this.genre.setValue(book.genre);
        this.publisher.setValue(book.publisher);

      })
    }
  }


  save(): void {
    if (this.validForm()) {
      this.disabled = true;
      if (this.bookId > 0) {
        this.book = {
          book_id: this.bookId,
          title: this.title.value,
          description: this.description.value,
          language: this.language.value,
          cover: this.cover.value,
          publisher_id: this.publisher.value,
          genre: this.genre.value
        };

        this.bookService.updateBook(this.book).subscribe(() => {
          this.dialogRef.close();
        },
          (error) => {
            this.disabled = false;
          });
      } else {
        this.book = {
          book_id: 0,
          title: this.title.value,
          description: this.description.value,
          language: this.language.value,
          cover: this.cover.value,
          publisher_id: this.publisher.value,
          genre: this.genre.value

        };
        this.bookService.createBook(this.book).subscribe(() => {
          this.dialogRef.close();
        },
        (error) => {
          this.disabled = false;
         });
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  validForm(): boolean{
    let valid: boolean = true;

      valid = valid && this.title.valid;
      valid = valid && this.description.valid;
      valid = valid && this.language.valid;
      valid = valid && this.genre.valid;


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

  getErrorMessageDescription(): string{
    return this.description.hasError('required')? "You must enter a description":"";
  }

  getErrorMessageLanguage(): string{
    return this.language.hasError('required')? "You must enter a language":"";
  }

  getErrorMessageGenre(): string{
    return this.genre.hasError('required')? "You must enter a genre":"";
  }


}
