import { Component, OnInit, Input } from '@angular/core';

// Services
import { TransferService } from '../services/transfer.service';
import { AccountService } from '../services/account.service';
import { ClientService } from '../services/client.service';
import { ToastrService } from 'ngx-toastr';

// Models
import { Transfer } from '../models/transfer.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transfer-view',
  templateUrl: './transfer-view.component.html',
  styleUrls: ['./transfer-view.component.css'],
  providers: [TransferService]
})
export class TransferViewComponent implements OnInit {

  @Input() accountNumberFrom: number;

  public transfers: Transfer[];

  constructor(private transferService: TransferService,
              private accountService: AccountService,
              private clientService: ClientService,
              private toastr: ToastrService) { }

  ngOnInit() {

    this.transfers = [];

    const actualUserId = localStorage.getItem('userId');
    let transfer: Transfer;

    this.transferService.getTransfers()
      .subscribe((transf: any) => {
        // Transfer information get successfully

        this.clientService.getByUserId(actualUserId)
          .subscribe((cli: any) => {

            cli.results.forEach(element => {
              if (element.user == actualUserId) {

                transf.results.forEach(t => {
                  if (element.accounts.includes(t.accountFrom) || element.accounts.includes(t.accountTo)) {
                    transfer = {
                      accountfrom: t.accountFrom,
                      accountto: t.accountTo,
                      amount: t.amount,
                      date: t.date,
                    };

                    this.transfers.push(transfer);
                  }
                });

              }
            });
          },
          (err: HttpErrorResponse) => {
            this.toastr.info('Impossible get back the transfers.');
        });

      },
      (err: HttpErrorResponse) => {
        this.toastr.info('Impossible get back the transfers.');
    });


  }

}
