import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-actions',
  templateUrl: './dialog-actions.component.html',
  styleUrls: ['./dialog-actions.component.css']
})
export class DialogActionsComponent implements OnInit {

  form: FormGroup;
  description:string;
  number: number;
  currency: string;
  amount: number;

  constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<DialogActionsComponent>,
        @Inject(MAT_DIALOG_DATA) data
  ) { 

    this.description = data.description;
    this.number = data.number;
    this.currency = data.currency;
    this.amount = data.amount;

  }

  ngOnInit() {


    this.form = this.fb.group({
      description: [this.description, []],
    });

  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
