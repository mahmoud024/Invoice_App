import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {InvocesComponent} from "./invoces/invoces.component";
import {AddInvoiceComponent} from "./invoces/header/add-invoice/add-invoice.component";
import {UpdateDeleteComponent} from "./invoces/cards/update-delete/update-delete.component";
import {SliderUpdateComponent} from "./invoces/cards/update-delete/slider-update/slider-update.component";
import {AuthGuard} from "@angular/fire/auth-guard";
import {AuthService} from "./services/auth.service";
import {GuardService} from "./services/guard.service";
import {UpdatedComponent} from "./invoces/cards/update-delete/updated/updated.component"; // Import the guard service


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [GuardService]},
  {path: 'invoices', component: InvocesComponent, canActivate: [GuardService]},
  {path: 'addInvoice', component: AddInvoiceComponent, canActivate: [GuardService]},
    {path: 'update/:id', component: UpdateDeleteComponent, canActivate: [GuardService]},
    {path: 'updated', component: UpdatedComponent, canActivate: [GuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
