import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

// Services
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../services/user.service';
import { ClientService } from '../services/client.service';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

// Models
import { User } from '../models/user.model';
import { Client } from '../models/client.model';
import { Account } from '../models/account.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogAddAccountComponent } from './dialog-add-account/dialog-add-account.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public actualUserId;
  public actualUser: User;
  public actualClient: Client;
  public accounts: Account[];
  public transferActive: boolean;
  public accountNumberFrom: number;
  public currencyFrom: string;

  constructor(private router: Router,
              private userService: UserService,
              private clientService: ClientService,
              private accountService: AccountService,
              private authService: AuthenticationService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.transferActive = false;

    let accountAux: Account;

    this.accounts = [];

    this.actualUserId = localStorage.getItem("userId");

    // Get user information
    this.userService.getById(this.actualUserId)
      .subscribe((data : any)=>{
          this.actualUser = {
            id: data.id,
            url: data.url,
            username: data.username,
            email: data.email
          };

          // Get client information
          this.clientService.getByUserId(this.actualUserId)
            .subscribe((data : any)=>{

              data.results.forEach(element => {
                if (element.user == this.actualUserId) {
                  localStorage.setItem('clientId', element.id);

                  this.actualClient = {
                    id: element.id,
                    user: element.user,
                    firstname: element.firstname,
                    lastname: element.lastname,
                    idcard: element.idcard,
                    phone: element.phone,
                    accounts: element.accounts
                  };
                }
              });

                // Get all accounts of client
                this.actualClient.accounts.forEach(accountId => {
                  
                  this.accountService.getAccountById(accountId)
                    .subscribe((data : any)=>{
                      // Account information get successfully
                      accountAux = {
                        id: data.id,
                        number: data.number,
                        clientid: data.client,
                        currencyid: data.currencyType,
                        currency: data.currency,
                        amount: data.amount
                      };

                      // Add account to Accounts list.
                      this.accounts.push(accountAux);
                    },
                    (err : HttpErrorResponse)=>{
                      this.toastr.info("You do not have an assigned account.");
                      this.toastr.info("Add an account.");
                  });
                  
                });

              },
              (err : HttpErrorResponse)=>{

                this.toastr.error("Impossible get back user information with id " + this.actualUserId);
            });

        },
        (err : HttpErrorResponse)=>{

          this.toastr.error("Impossible get back user information with id " + this.actualUserId);
      });

  }

  openDialogAddAccount(): void {
    const dialogConfig = new MatDialogConfig();
    let accountAux: Account;

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {

    };
    
    const dialogRef = this.dialog.open(DialogAddAccountComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {

          if (data) {

            this.accountService.create(parseInt(localStorage.getItem('clientId')), data.selectedCurrency, 0)
              .subscribe((data : any)=>{
                // Account information get successfully
                accountAux = {
                  id: data.id,
                  number: data.number,
                  clientid: data.client,
                  currencyid: data.currencyType,
                  currency: data.currency,
                  amount: data.amount
                };

                // Add account to Accounts list.
                this.accounts.push(accountAux);
                this.toastr.info("Account added.");
              },
              (err : HttpErrorResponse)=>{
                this.toastr.error("We cannot add the account.");
                this.toastr.info("Check that the currency you want to add does not exist.");
            });

          }
        } 
    );  
  }


  eventTransferActive(display: boolean) {
    this.transferActive = display;
  }

  eventaccountNumberFrom(accountNumber: number) {
    this.accountNumberFrom = accountNumber;
  }

  eventCurrencyFrom(currency: string) {
    this.currencyFrom = currency;
  }


  Logout() {

    this.authService.logout().subscribe((data : any)=>{
      localStorage.removeItem('userToken');
      this.router.navigate(['/login']);
    },
    (err : HttpErrorResponse)=>{
      this.toastr.error("Logout error.");
    });
  }
}
