import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PosComponent } from './components/pos/pos.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FoodItems } from './shared/foodItems.service';
import { SelectedItemsService } from './shared/selectedItems.service';
import { InvoicePrintComponent } from './admin/invoice-print/invoice-print.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { SettingsService } from './shared/settings.service';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardService } from './shared/dashboard.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';

import { ToastrModule } from 'ngx-toastr';
import { UserService } from './shared/user.service';

@NgModule({
  declarations: [
    AppComponent,
    PosComponent,
    DashboardComponent,
    LoginComponent,
    InvoicePrintComponent,
    SettingsComponent,
    RegisterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    DataTablesModule,
  ],
  providers: [
    FoodItems,
    SelectedItemsService,
    SettingsService,
    DashboardService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
