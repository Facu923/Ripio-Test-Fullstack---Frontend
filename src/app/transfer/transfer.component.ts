import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

// Services
import { AccountService } from '../services/account.service';
import { TransferService } from '../services/transfer.service';
import { ToastrService } from 'ngx-toastr';

// Models
import { Account } from '../models/account.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  @Input() accountNumberFrom: number;
  @Input() currencyFrom: string;
  @Output() transferActive = new EventEmitter<boolean>();

  form: FormGroup;

  public amountFrom;
  public amountAvailableFrom;
  public accountsTo: any[];
  public accountNumberTo;
  public amountTo;
  public actualAccount: Account;


  constructor(private accountService: AccountService,
              private transferService: TransferService,
              private toastr: ToastrService,
              private fb: FormBuilder) { }


  ngOnInit() {

    let accountsAux: any;

    this.amountFrom = 0;
    this.amountAvailableFrom = 0;
    this.amountTo = 0;
    this.accountsTo = [];

    this.form = this.fb.group({
      accountNumberTo: [this.accountNumberTo, []],
    });


    // Get back all accounts with same currency type
    this.accountService.getAccounts()
      .subscribe((data : any)=>{
        // Account information get successfully

        // Get the actual account information.
        accountsAux = data.results.filter(item => item.number === this.accountNumberFrom);

        // Get Accounts To without own account and Get only account with same currency type
        data.results.forEach(element => {
        });
        this.accountsTo = data.results.filter(item => item.number !== this.accountNumberFrom &&
                                                      item.currencyType === accountsAux[0].currencyType);

        
        if (accountsAux) {
          this.amountAvailableFrom = accountsAux[0].amount;

          this.actualAccount = {
            id: accountsAux[0].id,
            number: accountsAux[0].number,
            clientid: accountsAux[0].client,
            currencyid: accountsAux[0].currencyType,
            currency: accountsAux[0].currency,
            amount: accountsAux[0].amount
          };
        }

      },
      (err : HttpErrorResponse)=>{
        this.toastr.info("Impossible get back the accounts availables.");
    });
    
  }

  doTransfer() {

    this.amountAvailableFrom = parseInt(this.amountAvailableFrom);
    this.amountTo = parseInt(this.amountTo);
    this.accountNumberTo = parseInt(this.accountNumberTo);

    let accountTo = this.accountsTo.filter(item => item.number === this.accountNumberTo);

    if (accountTo) {

      // Amount To must be positive.
      if (this.amountTo > 0) {
        // Amount To must be greater than Amount Available.
        if (this.amountTo <= this.amountAvailableFrom) {

          this.transferService.create(this.actualAccount.id, accountTo[0].id, this.amountTo)
            .subscribe((data : any)=>{
              
              // Update amount of From and To Account

              // First Account From
              this.accountService.updateAmount(this.actualAccount.id, this.actualAccount.clientid,
                                              this.actualAccount.currencyid,
                                              this.amountAvailableFrom - this.amountTo)
                .subscribe((data : any)=>{

                  // Amount updated for Account From
                  // Now we will update amount of Account To

                  this.accountService.updateAmount(accountTo[0].id, accountTo[0].client,
                                                   accountTo[0].currencyType,
                                                   parseInt(accountTo[0].amount) + parseInt(this.amountTo))
                    .subscribe((data : any)=>{

                      // Amount updated for Account From

                      // Successful transfer

                      // Deactive transfer component
                      this.transferActive.emit(false);
                      this.toastr.info("Successful transfer.");

                    },
                    (err : HttpErrorResponse)=>{
                    this.toastr.info("Error when updating the Account To amount.");
                    });

                },
                (err : HttpErrorResponse)=>{
                  this.toastr.info("Error when updating the Account From amount.");
              });

            },
            (err : HttpErrorResponse)=>{
              this.toastr.info("Error when creating the Transfer.");
          });

        }
        else {
          this.toastr.error("Amount To must be lower or equal than Amount Available.");
        }
      }
      else {
        this.toastr.error("Amount To must be greater than 0.");
      }

    }
    else {
      this.toastr.error("Impossible get back the Account To information.");
    }
    
  }

  goBack() {
    this.transferActive.emit(false);
  }

}
