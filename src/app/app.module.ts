// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// Routes
import { appRoutes } from './app.routing';
import { RouterModule } from '@angular/router'

// Authorization
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

// Services
import { UserService } from './services/user.service';
import { AuthenticationService } from './_services/authentication.service';


// Components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AccountComponent } from './account/account.component';
import { TransferComponent } from './transfer/transfer.component';

// Material
import { MatCardModule, MatButtonModule, MatDialogModule,
         MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

// datatable
import { DataTableModule } from 'angular-6-datatable';

// Dialog
import { DialogActionsComponent } from './account/dialog-actions/dialog-actions.component';
import { DialogAddAccountComponent } from './home/dialog-add-account/dialog-add-account.component';
import { DialogDepositComponent } from './account/dialog-deposit/dialog-deposit.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    AccountComponent,
    HomeComponent,
    DialogActionsComponent,
    DialogAddAccountComponent,
    TransferComponent,
    DialogDepositComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    DataTableModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    UserService,
    AuthGuard,
    AuthenticationService,

    
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogActionsComponent,
    DialogAddAccountComponent,
    DialogDepositComponent
  ]
})
export class AppModule { }
