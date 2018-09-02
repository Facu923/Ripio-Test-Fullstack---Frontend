import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-deposit',
  templateUrl: './dialog-deposit.component.html',
  styleUrls: ['./dialog-deposit.component.css']
})
export class DialogDepositComponent implements OnInit {

  form: FormGroup;
  number: number;
  currency: string;
  amountNew: number;


  constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogDepositComponent>,
        @Inject(MAT_DIALOG_DATA) data
  ) {
    this.number = data.number;
    this.currency = data.currency;
   }

  ngOnInit() {
    this.form = this.fb.group({
      amountNew: [this.amountNew, []],
    });

    this.amountNew = 0;
  }

  save() {
    this.form.value.amountNew = this.amountNew;
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
