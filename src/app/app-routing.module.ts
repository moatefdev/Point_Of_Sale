import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PosComponent } from './components/pos/pos.component';
import { InvoicePrintComponent } from './admin/invoice-print/invoice-print.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WaitingListComponent } from './components/waiting-list/waiting-list.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';

const routes: Routes = [
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/kitchen', component: KitchenComponent },
  { path: 'admin/settings', component: SettingsComponent },
  { path: 'invoice-print', component: InvoicePrintComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pos', component: PosComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'waiting', component: WaitingListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
