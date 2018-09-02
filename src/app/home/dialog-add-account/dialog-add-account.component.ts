import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';

// Services
import { CurrencyService } from '../../services/currency.service';
import { ToastrService } from 'ngx-toastr';

// Models
import { Currency } from '../../models/currency.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-add-account',
  templateUrl: './dialog-add-account.component.html',
  styleUrls: ['./dialog-add-account.component.css']
})
export class DialogAddAccountComponent implements OnInit {

  form: FormGroup;
  selectedCurrency: string;
  currencies: Currency[] = [];

  constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogAddAccountComponent>,
        private currencyService: CurrencyService,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) data
  ) { 

  }


  ngOnInit() {

    let currency: Currency;

    this.form = this.fb.group({
      selectedCurrency: [this.selectedCurrency, []],
    });

    this.currencyService.getCurrencies()
      .subscribe((data : any)=>{
        // Account information get successfully

        data.results.forEach(curr => {
          currency = {
            id: curr.id,
            name: curr.name,
            symbol: curr.symbol
          };

          this.currencies.push(currency);
        });

      },
      (err : HttpErrorResponse)=>{
        this.toastr.error("Impossible get back currencies type.");
    });
  }

  save() {
    this.form.value.selectedCurrency = this.selectedCurrency;
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
