import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(form):void{
    this.authService.login(form.value).subscribe(res => {
      this.router.navigateByUrl('/auth');
    });
  }

}
