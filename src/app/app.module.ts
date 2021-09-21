import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PosComponent } from './components/pos/pos.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { WaitingListComponent } from './components/waiting-list/waiting-list.component';
import { MobileErrorComponent } from './components/mobile-error/mobile-error.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddItemsComponent } from './admin/add-items/add-items.component';
import { FoodItems } from './shared/foodItems';
import { SelectedItemsService } from './shared/selectedItems';
import { InvoicePrintComponent } from './admin/invoice-print/invoice-print.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { SettingsService } from './shared/settings';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardService } from './shared/dashboard.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    PosComponent,
    KitchenComponent,
    WaitingListComponent,
    MobileErrorComponent,
    DashboardComponent,
    LoginComponent,
    AddItemsComponent,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
