import { WriterService } from './../../services/writer.service';
import { Writer } from './../../models/writer';
import { PublisherService } from './../../services/publisher.service';
import { Publisher } from './../../models/publisher';
import { CreditCard } from './../../models/credit-card';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';import { ReaderService } from './../../services/reader.service';
import { Reader } from './../../models/reader';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]

})

export class RegisterComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private readerService: ReaderService,
    private publisherService: PublisherService, private writerService: WriterService) { }

  expirationDate = new FormControl(moment(), { validators: [Validators.required] });

  email = new FormControl('', { validators: [Validators.required, Validators.email]});
  pass = new FormControl('', { validators: [Validators.required] });
  confirmPass = new FormControl('', [Validators.required, this.samePasswordValidator(this.pass)]);

  name = new FormControl('', { validators: [Validators.required] });
  phone = new FormControl('');
  address = new FormControl('');
  photo = new FormControl('');

  VAT = new FormControl('', { validators: [Validators.required] });
  comercialName = new FormControl('', { validators: [Validators.required] });

  holder = new FormControl('', { validators: [Validators.required] });
  make = new FormControl('', { validators: [Validators.required] });
  number = new FormControl('', { validators: [Validators.required] });
  cvv = new FormControl('', { validators: [Validators.required] });

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  hide = true;

  hideConfirmPass = true;

  rol = this.data.rol;

  disabled: boolean;

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      email: this.email,
      pass: this.pass,
      confirmPass: this.confirmPass
    });
    if(this.rol == 'publisher'){
      this.secondFormGroup = this._formBuilder.group({
        name: this.name,
        VAT: this.VAT,
        comercialName: this.comercialName
      });
    }else{
      this.secondFormGroup = this._formBuilder.group({
        name: this.name
      });
    }
    if(this.rol != 'reader'){
      this.thirdFormGroup = this._formBuilder.group({
        holder: this.holder,
        make: this.make,
        number: this.number,
        expirationDate: this.expirationDate,
        cvv: this.cvv
      });
    }
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.expirationDate.value;
    ctrlValue.year(normalizedYear.year());
    this.expirationDate.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.expirationDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.expirationDate.setValue(ctrlValue);
    datepicker.close();
  }

  register():void{
    this.disabled = true;
    if(this.rol == "reader"){
      let reader : Reader = {id: 0, email: this.email.value, password: this.pass.value, name: this.name.value, phone_number: this.phone.value, photo: this.photo.value, address: this.address.value}
      this.readerService.register(reader).subscribe(res => {
        this.dialogRef.close();
      }, (error) => {
        this.disabled = false;
      });
    }
    if(this.rol == "writer"){
      let creditCard : CreditCard = {holder: this.holder.value, make: this.make.value, number: this.number.value,
        expiration_month: this.expirationDate.value.month(), expiration_year: this.expirationDate.value.year(), cvv: this.cvv.value}
      let writer : Writer = {id: 0, email: this.email.value, password: this.pass.value, name: this.name.value, phone_number: this.phone.value, photo: this.photo.value, address: this.address.value, credit_card: creditCard}
      this.writerService.register(writer).subscribe(res => {
        this.dialogRef.close();
      }, (error) => {
        this.disabled = false;
      });
    }
    if(this.rol == "publisher"){
      let creditCard : CreditCard = {holder: this.holder.value, make: this.make.value, number: this.number.value,
        expiration_month: this.expirationDate.value.month(), expiration_year: this.expirationDate.value.year(), cvv: this.cvv.value}
      let publisher : Publisher = {id: 0, email: this.email.value, password: this.pass.value, name: this.name.value, phone_number: this.phone.value, photo: this.photo.value, address: this.address.value, VAT:this.VAT.value, comercial_name:this.comercialName.value, credit_card: creditCard}
      this.publisherService.register(publisher).subscribe(res => {
        this.dialogRef.close();
      }, (error) => {
        this.disabled = false;
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  validForm(): boolean{
    let valid: boolean = true;

      valid = valid && this.email.valid;
      valid = valid && this.pass.valid;
      valid = valid && this.confirmPass.valid;
      valid = valid && this.name.valid;
      if(this.rol == 'publisher'){
        valid = valid && this.VAT.valid;
        valid = valid && this.comercialName.valid;
      }
      if(this.rol != 'reader'){
        valid = valid && this.holder.valid;
        valid = valid && this.make.valid;
        valid = valid && this.number.valid;
        valid = valid && this.cvv.valid;
        valid = valid && this.expirationDate.valid;
      }

    return valid
  }

  abled(): boolean{
    if(this.disabled){
      return true;
    }else{
      return !this.validForm();
    }
  }

  samePasswordValidator(pass: FormControl) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let res = control.value != pass.value ? { 'notSamePassword': "Password doesn't match" } : null;
      return res;
    };
  }

  validEmailValidator() {
    this.userService.isValidEmail(this.email.value).subscribe((res: boolean) => {
      if (res) {
        this.email.setErrors({ 'usedEmail': true });
      } else {
        this.email.updateValueAndValidity();
      }
    });
  }

  validCvvValidator() {

      if (this.cvv.value < 100 || this.cvv.value > 999) {
        this.cvv.setErrors({ 'notInRange': true });
      } else {
        this.email.updateValueAndValidity();
      }
  }

  getErrorMessageEmail() : string{
    return this.email.hasError('required')? "You must enter an email":
    this.email.hasError('email') ? "The email must be in a valid format":
    this.email.hasError('usedEmail') ? 'This email is already in use' : '';
  }
  getErrorMessagePass(): string{
    return this.pass.hasError('required')? "You must enter a password":"";
  }

  getErrorMessageName(): string{
    return this.name.hasError('required')? "You must enter a name":"";
  }

  getErrorMessageConfirmPass():string {
    return this.confirmPass.hasError('required') ? "You must enter a confirm password" :
      this.confirmPass.hasError('notSamePassword') ? "Password doesn't match":"";
  }

  getErrorMessageVAT(): string{
    return this.VAT.hasError('required')? "You must enter a VAT":"";
  }

  getErrorMessageComercialName(): string{
    return this.comercialName.hasError('required')? "You must enter a comercial name":"";
  }

  getErrorMessageHolder(): string{
    return this.holder.hasError('required')? "You must enter a holder":"";
  }

  getErrorMessageMake(): string{
    return this.make.hasError('required')? "You must enter a make":"";
  }

  getErrorMessageNumber(): string{
    return this.number.hasError('required')? "You must enter a number":"";
  }

  getErrorMessageExpirationDate(): string{
    return this.expirationDate.hasError('required')? "You must enter a date":"";
  }

  getErrorMessageCvv(): string{
    return this.cvv.hasError('required')? "You must enter cvv":
    this.cvv.hasError('notInRange') ? "CVV must be between 100 and 999":"";
  }

}
