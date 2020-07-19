import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  email = new FormControl('', { validators: [Validators.required, Validators.email]});
  pass = new FormControl('', { validators: [Validators.required] });
  confirmPass = new FormControl('', [Validators.required, this.samePasswordValidator(this.pass)]);
  firstFormGroup: FormGroup;

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
  }

  register():void{
    this.disabled = true;
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  validForm(): boolean{
    let valid: boolean = true;

      valid = valid && this.email.valid;
      valid = valid && this.pass.valid;
      valid = valid && this.confirmPass.valid;


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

  getErrorMessageEmail() : string{
    return this.email.hasError('required')? "You must enter an email": this.email.hasError('email') ? "The email must be in a valid format": "";
  }
  getErrorMessagePass(): string{
    return this.pass.hasError('required')? "You must enter a password":"";
  }
  getErrorMessageConfirmPass():string {
    return this.confirmPass.hasError('required') ? "You must enter a confirm password" :
      this.confirmPass.hasError('notSamePassword') ? "Password doesn't match":"";
  }

}
