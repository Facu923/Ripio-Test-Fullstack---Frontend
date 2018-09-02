import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';

// Models
import { Account } from '../models/account.model';

// Material
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';

// Dialog
import { DialogActionsComponent } from './dialog-actions/dialog-actions.component';
import { DialogDepositComponent } from './dialog-deposit/dialog-deposit.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {

  @Input() accounts: Account[];
  @Output() transferActive = new EventEmitter<boolean>();
  @Output() accountNumberFrom = new EventEmitter<number>();
  @Output() currencyFrom = new EventEmitter<string>();
    

  constructor(public dialog: MatDialog,
              private accountService: AccountService,
              private toastr: ToastrService) { }


  ngOnInit() {
    
  }


  openDialog(accNumber: number, accCurrency: string, accAmount: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        number: accNumber,
        currency: accCurrency,
        amount: accAmount
    };
    
    const dialogRef = this.dialog.open(DialogActionsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if (data) {

            const account: Account = this.accounts.find(item => item.number === accNumber);

            this.accountService.deleteById(account.id)
              .subscribe((data : any)=>{
                // Account was delete

                // Remove the deleted account
                this.accounts = this.accounts.filter(item => item.number !== accNumber);
                this.toastr.info("Account " + accCurrency + " deleted.");
              },
              (err : HttpErrorResponse)=>{
                this.toastr.error("We cannot delete the account.");
            });

          }
        }  
    );    
  }

  goTransfer(number: number, currency: string) {
    this.transferActive.emit(true);
    this.accountNumberFrom.emit(number);
    this.currencyFrom.emit(currency);
  }


  goDeposit(number: number, currency: string): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        number: number,
        currency: currency
    };
    
    const dialogRef = this.dialog.open(DialogDepositComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          if (data) {

            const account: Account = this.accounts.find(item => item.number === number);
            const param: number = parseInt(data.amountNew, 10)

            if (data.amountNew > 0) {
              
              const total = (account.amount*1) + param;

              this.accountService.updateAmount(account.id, account.clientid,
                                               account.currencyid,
                                               total)
                .subscribe((data : any)=>{

                // Amount updated for Account

                this.toastr.info("Successful deposit.");

                },
                (err : HttpErrorResponse)=>{
                this.toastr.error("Error in deposit.");
                });

            }
            else {
              this.toastr.error("Amount must be greater than 0.");
            }
            
          }
        }  
    );  

  }

}