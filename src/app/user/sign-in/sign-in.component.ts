import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// Services
import { AuthenticationService } from '../../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private authService: AuthenticationService,
              private toastr: ToastrService,
              private router : Router) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();
  }

  OnSubmit(userName, password){

      this.authService.loginUser(userName, password).subscribe((data : any)=>{
        localStorage.setItem('userToken', data.key);
        localStorage.setItem('userId', data.user);
        this.router.navigate(['/home']);
      },
      (err : HttpErrorResponse)=>{
        this.toastr.error("Login error.");
        this.isLoginError = true;
      });
  }

}
