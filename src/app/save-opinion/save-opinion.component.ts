import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OpinionService } from './../services/opinion.service';
import { OpinionToSave, Opinion } from './../models/opinion';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-save-opinion',
  templateUrl: './save-opinion.component.html',
  styleUrls: ['./save-opinion.component.css']
})
export class SaveOpinionComponent implements OnInit {

  disabled: boolean;
  positive = new FormControl(true);
  review = new FormControl('', { validators: [Validators.required] });

  opinionId: number;
  bookId: number;
  readerId: number;
  opinion: OpinionToSave;
  date = new Date();
  constructor(public dialogRef: MatDialogRef<SaveOpinionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private opinionService: OpinionService) {
    this.opinionId = this.data.id;
  }

  ngOnInit(): void {
    if (this.opinionId > 0) {
      this.opinionService.findOpinion(this.opinionId).subscribe((opinion: Opinion) => {
        this.positive.setValue(opinion.positive);
        this.review.setValue(opinion.review);
        this.bookId = opinion.book;
        this.readerId = opinion.user.id;
      })
    }else{
      this.bookId = this.data.bookId;
      this.readerId = this.data.userId;
    }
  }



  save(): void {
    if (this.validForm()) {
      this.disabled = true;
      if (this.opinionId > 0) {
        this.opinion = {
          opinion_id: this.opinionId,
          positive: this.positive.value,
          review: this.review.value,
          date: this.date,
          book_id: this.bookId,
          reader_id: this.readerId
        };

        this.opinionService.updateOpinion(this.opinion).subscribe((opinion: Opinion) => {
          this.dialogRef.close();
        },
          (error) => {
            this.disabled = false;
          });
      } else {
        this.opinion = {
          opinion_id: 0,
          positive: this.positive.value,
          review: this.review.value,
          date: this.date,
          book_id: this.bookId,
          reader_id: this.readerId
        };
        this.opinionService.createOpinion(this.opinion).subscribe((opinion: Opinion) => {
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

    valid = valid && this.review.valid;

    return valid
  }

  abled(): boolean{
    if(this.disabled){
      return true;
    }else{
      return !this.validForm();
    }
  }

  getErrorMessageReview(): string{
    return this.review.hasError('required')? "You must enter a review":"";
  }

}
