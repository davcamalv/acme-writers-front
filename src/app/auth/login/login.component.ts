import { UserLog } from './../../models/jwt-response';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', { validators: [Validators.required, Validators.email]});
  pass = new FormControl('', { validators: [Validators.required] });
  disabled: boolean;

  constructor( public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login():void{
    this.disabled = true;
    let user : UserLog = {email: this.email.value, password: this.pass.value}
    this.authService.login(user).subscribe(res => {
      this.dialogRef.close();
    }, (error) => {
      this.disabled = false;
      this.pass.setErrors({invalid: true});
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  updateValidationInvalidPassword(): void {
    this.pass.setErrors({invalid: true});
    this.pass.updateValueAndValidity();
  }

  validForm(): boolean{
    let valid: boolean = true;

      valid = valid && this.email.valid;
      valid = valid && this.pass.valid;


    return valid
  }

  abled(): boolean{
    if(this.disabled){
      return true;
    }else{
      return !this.validForm();
    }
  }

  getErrorMessageEmail() : string{
    return this.email.hasError('required')? "You must enter an email": this.email.hasError('email') ? "The email must be in a valid format": "";
  }
  getErrorMessagePass(): string{
    return this.pass.hasError('required')? "You must enter a password": this.pass.hasError('invalid')? "Email or password not found, please check":"";
  }
}
