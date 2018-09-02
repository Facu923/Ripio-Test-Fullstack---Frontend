import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// Models
import { Login } from '../../models/login.model';
import { Client } from '../../models/client.model';

// Services
import { AuthenticationService } from '../../_services/authentication.service';
import { ClientService } from '../../services/client.service';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public user: Login;
  public client: Client;
  
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private authService: AuthenticationService,
              private clientService: ClientService,
              private userService: UserService,
              private toastr: ToastrService,
              private router : Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }

    this.user = {
      username: '',
      password1: '',
      password2: '',
      email: ''
    };

    this.client = {
      id: 0,
      user: '',
      firstname: '',
      lastname: '',
      idcard: '',
      phone: '',
      accounts: []
    };
  }

  OnSubmit(form: NgForm) {

    // User
    this.user.username = form.value.UserName;
    this.user.password1 = form.value.Password1;
    this.user.password2 = form.value.Password2;
    this.user.email = form.value.Email;

    // Client
    this.client.firstname = form.value.FirstName;
    this.client.lastname = form.value.LastName;
    this.client.idcard = form.value.IDCard;
    this.client.phone = form.value.Phone;

    if (this.user.password1 == this.user.password2) {
      this.authService.registerUser(this.user, this.client)
        .subscribe((dataUser : any)=>{
            localStorage.setItem('userToken', dataUser.key);
            localStorage.setItem('userId', dataUser.user);

            // Create Client in Data Base
            this.clientService.create(this.client)
              .subscribe((dataClient : any)=>{
                  this.router.navigate(['/login']);
                },
                (err : HttpErrorResponse)=>{

                  localStorage.removeItem('userToken');
                  localStorage.removeItem('userId');

                  this.toastr.error("Error creating client.");
              });

          },
          (err : HttpErrorResponse)=>{
            this.toastr.error("Error getting user information.");

            // Delete created user
            this.userService.delete()
              .subscribe((dataUser : any)=>{
                  localStorage.removeItem('userToken');
                  localStorage.removeItem('userId');
                },
                (err : HttpErrorResponse)=>{
                  this.toastr.error("Error deleting user.");
              });

        });
    }
  }
}
